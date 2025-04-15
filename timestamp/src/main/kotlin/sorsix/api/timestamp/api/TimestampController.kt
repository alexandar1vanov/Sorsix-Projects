package sorsix.api.timestamp.api

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import sorsix.api.timestamp.domain.Timestamp
import sorsix.api.timestamp.domain.TimestampError
import sorsix.api.timestamp.domain.TimestampResponse
import sorsix.api.timestamp.service.TimeStampService

@RestController
@RequestMapping("/api")
class TimestampController(val timeStampService: TimeStampService) {
    @GetMapping(value = ["", "/"])
    fun getTimestamp(): Timestamp {
        return timeStampService.getTimestamp()
    }

    @GetMapping("/{dateFormat}")
    fun parseDate(@PathVariable dateFormat: String): ResponseEntity<TimestampResponse> =
        try {
            ResponseEntity.ok(timeStampService.dateTime(dateFormat))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(TimestampError("Invalid date format: $dateFormat"))
        }
}