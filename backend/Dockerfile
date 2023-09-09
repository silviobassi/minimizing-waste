FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

ARG JAR_FILE

COPY target/${JAR_FILE} /app/minimizing-api.jar
COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

EXPOSE 8080

CMD ["java", "-jar", "minimizing-api.jar"]