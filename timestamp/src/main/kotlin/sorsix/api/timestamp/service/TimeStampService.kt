package sorsix.api.timestamp.service

import org.springframework.stereotype.Service
import sorsix.api.timestamp.domain.DateFormatPattern
import sorsix.api.timestamp.domain.Timestamp
import java.text.SimpleDateFormat
import java.util.*

@Service
class TimeStampService {

    fun getTimestamp(): Timestamp {
        return createTimestamp(Date())
    }

    fun createTimestamp(date: Date): Timestamp {
        return Timestamp(
            unix = date.time,
            utc = SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss 'GMT'", Locale.US).apply {
                timeZone = TimeZone.getDefault()
            }.format(date)
        )
    }

    fun String.isUNIX() = matches(Regex("^\\d+$"))

    fun dateTime(date: String): Timestamp {
        return try {
            if (date.isUNIX()) {
                parseUNIX(date)
            } else {
                parseUTC(date)
            }
        } catch (e: Exception) {
            throw IllegalArgumentException("Invalid date format $date")
        }
    }

    fun parseUNIX(date: String): Timestamp {
        return try {
            val ms = date.toLong()
            Timestamp(
                unix = ms,
                utc = SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss 'GMT'", Locale.US).apply {
                    timeZone = TimeZone.getDefault()
                }.format(Date(ms))
            )
        } catch (e: Exception) {
            throw IllegalArgumentException("Invalid date format $date")
        }
    }

    fun parseUTC(date: String): Timestamp {
        val inputFormat = parseFlexibleDate(date)
        if (inputFormat != null) {
            return Timestamp(
                unix = inputFormat.time,
                utc = SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss 'GMT'", Locale.US).apply {
                    timeZone = TimeZone.getDefault()
                }.format(inputFormat)
            )
        }
        throw IllegalArgumentException("Invalid date format $date")
    }

    fun parseFlexibleDate(input: String): Date? {
        for (format in DateFormatPattern.entries) {
            try {
                return format.toFormatter().parse(input)
            } catch (_: Exception) {
            }
        }
        return null
    }


}