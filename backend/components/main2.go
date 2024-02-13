package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Data struct {
	Score    int    `json:"score"`
	UserName string `json:"userName"`
}

func main() {
	fmt.Print("Hello world")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// bigdata := []Data{}

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Post("/updatescore", func(c *fiber.Ctx) error {
		var newdata Data

		if err := c.BodyParser(&newdata); err != nil {
			return err
		}

		fmt.Println("Received data", newdata.Score)
		fmt.Println("Received data", newdata.UserName)
		return c.JSON(newdata)
	})

	log.Fatal(app.Listen(":4000"))

}
