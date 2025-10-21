<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    protected $model = \App\Models\Book::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "book_name" => $this->faker->sentence(3),
            "price" => $this->faker->numberBetween(10, 100),
            "description" => $this->faker->text(100),
            "image" => "https://picsum.photos/200/300?random=" . $this->faker->unique()->numberBetween(1, 1000)
        ];
    }
}
