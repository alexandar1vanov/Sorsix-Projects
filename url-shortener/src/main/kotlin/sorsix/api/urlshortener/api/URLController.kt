package sorsix.api.urlshortener.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.view.RedirectView
import sorsix.api.urlshortener.domain.Request
import sorsix.api.urlshortener.domain.URL
import sorsix.api.urlshortener.service.UrlShortenerService


@RestController
@RequestMapping("/api/shorturl")
class URLController(val service: UrlShortenerService) {

    @GetMapping("/{shortUrl}")
    fun redirect(@PathVariable shortUrl: String): Any =
        service.getShortUrl(shortUrl)?.let {
            RedirectView(it.originalUrl)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("error" to "URL not found"))


    @PostMapping
    fun createUrl(@RequestBody request: Request): ResponseEntity<Any> {
        return try {
            val created = service.saveUrl(request.url)
            ResponseEntity.status(HttpStatus.CREATED).body(created)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("error" to e.message))
        } catch (e: IllegalStateException) {
            ResponseEntity.status(HttpStatus.CONFLICT).body(mapOf("error" to e.message))
        }
    }

}