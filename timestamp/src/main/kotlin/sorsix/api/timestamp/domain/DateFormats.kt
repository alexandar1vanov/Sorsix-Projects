package sorsix.api.timestamp.domain

import java.text.SimpleDateFormat
import java.util.*

enum class DateFormatPattern(val pattern: String) {
    DD_MM_YYYY("dd-MM-yyyy"),
    MM_DD_YYYY("MM-dd-yyyy"),
    MM_YYYY("MM-yyyy"),
    YYYY_MM_DD("yyyy-MM-dd"),
    DD_MM_YYYY_SLASH("dd/MM/yyyy"),
    MM_DD_YYYY_SLASH("MM/dd/yyyy"),
    YYYY_MM_DD_SLASH("yyyy/MM/dd"),
    DD_MM_YYYY_DOT("dd.MM.yyyy"),
    YYYY_MM_DD_DOT("yyyy.MM.dd"),
    DD_MMM_YYYY("dd MMM yyyy"),
    DD_MMMM_YYYY("dd MMMM yyyy");

    fun toFormatter(): SimpleDateFormat =
        SimpleDateFormat(pattern, Locale.getDefault()).apply {
            isLenient = false
        }
}
