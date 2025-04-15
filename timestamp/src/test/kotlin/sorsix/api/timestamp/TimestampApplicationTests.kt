package sorsix.api.timestamp.test

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import sorsix.api.timestamp.domain.Timestamp
import sorsix.api.timestamp.service.TimeStampService
import java.text.SimpleDateFormat
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

@SpringBootTest
class TimestampServiceTests {

    @Autowired
    private lateinit var timeStampService: TimeStampService

    @Test
    fun contextLoads() {
    }

    @Test
    fun `test dateTime with invalid date format`() {
        val date = "Invalid-Date-Format"

        assertThrows<IllegalArgumentException> {
            timeStampService.dateTime(date)
        }
    }

    @Test
    fun `test dateTime with invalid month`() {
        val date = "2015-13-25"

        assertThrows<IllegalArgumentException> {
            timeStampService.dateTime(date)
        }
    }

    @Test
    fun `test dateTime with invalid day`() {
        val date = "2015-12-35"

        assertThrows<IllegalArgumentException> {
            timeStampService.dateTime(date)
        }
    }

    @Test
    fun `test dateTime with invalid unix timestamp`() {
        val date = "999999999999999999999"

        assertThrows<IllegalArgumentException> {
            timeStampService.dateTime(date)
        }
    }

    @Test
    fun `test parseFlexibleDate with valid ISO date`() {
        val date = "2015-12-25"
        val result = timeStampService.parseFlexibleDate(date)

        assertNotNull(result)
    }

    @Test
    fun `test parseFlexibleDate with valid dd-MM-yyyy format`() {
        val date = "25-12-2015"
        val result = timeStampService.parseFlexibleDate(date)

        assertNotNull(result)
    }

    @Test
    fun `test parseFlexibleDate with valid dd MMM yyyy format`() {
        val date = "25 Dec 2015"
        val result = timeStampService.parseFlexibleDate(date)

        assertNotNull(result)
    }

    @Test
    fun `test parseFlexibleDate with invalid date`() {
        val date = "Invalid-Date-Format"
        val result = timeStampService.parseFlexibleDate(date)

        assertNull(result)
    }

    @Test
    fun `test dateTime with valid unix timestamp`() {
        val unixTimestamp = "1609459200000"
        val result = timeStampService.dateTime(unixTimestamp)

        assertEquals(1609459200000, result.unix)
        assertNotNull(result.utc)
    }

    @Test
    fun `test createTimestamp with specific date`() {
        val date = SimpleDateFormat("yyyy-MM-dd").parse("2020-01-01")
        val result = timeStampService.createTimestamp(date)

        assertEquals(date.time, result.unix)
        assert(result.utc.contains("2020"))
    }

    @Test
    fun `test leap year date`() {
        val date = "29-02-2020"
        val result = timeStampService.dateTime(date)

        assertNotNull(result)
    }

    @Test
    fun `test invalid leap year date`() {
        val date = "29-02-2019"

        assertThrows<IllegalArgumentException> {
            timeStampService.dateTime(date)
        }
    }

    @Test
    fun `test empty string input`() {
        val date = ""

        assertThrows<IllegalArgumentException> {
            timeStampService.dateTime(date)
        }
    }

}
