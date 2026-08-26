plugins {
    java
    id("org.springframework.boot") version "4.0.6" // Match your Spring Boot version
    id("io.spring.dependency-management") version "1.1.4"
}

group = "pk.wishfaah"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    // Spring Boot Starters
    implementation(libs.org.springframework.boot.spring.boot.starter.data.jpa)
    implementation(libs.org.springframework.boot.spring.boot.starter.security)
    implementation(libs.org.springframework.boot.spring.boot.starter.validation)
    implementation(libs.org.springframework.boot.spring.boot.starter.web)

    // Lombok Configuration (Fixes Lombok compilation issues)
    compileOnly(libs.org.projectlombok.lombok)
    annotationProcessor(libs.org.projectlombok.lombok)
    testCompileOnly(libs.org.projectlombok.lombok)
    testAnnotationProcessor(libs.org.projectlombok.lombok)

    // Jackson
    implementation(libs.com.fasterxml.jackson.core.jackson.databind)

    // Database
    runtimeOnly(libs.com.mysql.mysql.connector.j)

    // Testing
    testImplementation(libs.org.springframework.boot.spring.boot.starter.test)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
}

tasks.withType<Test> {
    useJUnitPlatform()
}