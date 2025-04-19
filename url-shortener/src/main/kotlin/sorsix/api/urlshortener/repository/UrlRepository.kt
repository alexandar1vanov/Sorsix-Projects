package sorsix.api.urlshortener.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import sorsix.api.urlshortener.domain.URL

@Repository
interface UrlRepository : JpaRepository<URL, String>{
    fun findByShortUrl(shortUrl: String): URL?
    fun findByOriginalUrl(originalUrl: String): URL?
}
