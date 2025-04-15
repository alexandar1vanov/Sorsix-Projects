package sorsix.api.timestamp.domain

sealed interface TimestampResponse

data class Timestamp(
    val unix: Long,
    val utc: String,
) : TimestampResponse