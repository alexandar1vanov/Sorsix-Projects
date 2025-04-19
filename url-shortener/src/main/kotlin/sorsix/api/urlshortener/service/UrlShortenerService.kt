package sorsix.api.urlshortener.service

import org.springframework.stereotype.Service
import sorsix.api.urlshortener.domain.URL
import sorsix.api.urlshortener.repository.UrlRepository
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.security.SecureRandom
import org.slf4j.LoggerFactory

@Service
class UrlShortenerService(val urlRepository: UrlRepository) {
    val alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    val random = SecureRandom()
    private val logger = LoggerFactory.getLogger(UrlShortenerService::class.java)

    fun saveUrl(originalUrl: String): URL {
        if (!UrlValidation(originalUrl)) {
            throw IllegalArgumentException("Invalid URL format")
        }

        val existing = urlRepository.findByOriginalUrl(originalUrl)
        if (existing != null) {
            throw IllegalStateException("URL already exists with short URL: ${existing.shortUrl}")
        }

        val randomCode = generateRandomCode()
        logger.info("Generated random code: $randomCode for URL: $originalUrl")
        return urlRepository.save(URL(randomCode, originalUrl))
    }

    fun UrlValidation(url: String, checkReach: Boolean = false): Boolean {
        val uri = try {
            URI(url)
        } catch (e: Exception) {
            return false
        }
        if (!uri.isAbsolute || !(url.startsWith("http://") || url.startsWith("https://"))) {
            return false
        }
        try {
            uri.toURL()
        } catch (e: Exception) {
            return false
        }
        if (checkReach) {
            val client = HttpClient.newHttpClient()
            val request = HttpRequest.newBuilder()
                .uri(uri)
                .GET()
                .build()
            val response = try {
                client.send(request, HttpResponse.BodyHandlers.ofString())
            } catch (e: Exception) {
                return false
            }
            if (response.statusCode() != 200) {
                return false
            }
        }
        return true
    }

    fun getShortUrl(shortUrl: String): URL? {
        try {
            return urlRepository.findByShortUrl(shortUrl)
        } catch (e: Exception) {
            throw RuntimeException("Error fetching URL by original URL: ${e.message}", e)
        }
    }

    fun generateRandomCode(length: Int = 7): String {
        return (1..length)
            .map { alphabet[random.nextInt(alphabet.length)] }
            .joinToString("")
    }

}