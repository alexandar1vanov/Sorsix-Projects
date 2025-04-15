package sorsix.api.timestamp.domain

data class TimestampError(
    val error: String = "Invalid date"
) : TimestampResponse