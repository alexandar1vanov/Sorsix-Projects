package sorsix.api.urlshortener.domain

import jakarta.persistence.*

@Entity
@Table(name = "urls")
data class URL(
    @Id
    @Column(name = "shorturl")
    val shortUrl: String = "",

    @Column(name = "originalurl")
    val originalUrl: String = ""
)
