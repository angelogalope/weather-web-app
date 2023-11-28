<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;

class ForecastController extends Controller
{
    private $apiKey;

    public function getForecast(string $cityName)
    {
        $this->apiKey = env('WEATHER_API_KEY');

        $url = "https://api.openweathermap.org/data/2.5/forecast?q={$cityName}&appid={$this->apiKey}";

        try {
            $forecast = Http::get($url);

            $forecastResults = $forecast->json();

            // Extract the relevant forecast data for all available days
            $extendedForecast = $this->extractExtendedForecast($forecastResults);

            return response()->json([
                'cityName' => $cityName,
                'forecast' => $extendedForecast,
            ]);
        } catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'Error getting forecast data for ' . $cityName,
                    'error' => $e->getMessage(),
                ],
                404
            );
        }
    }

    private function extractExtendedForecast(array $forecastResults)
    {
        // Assuming the forecast data is in the 'list' key of the response
        $forecastList = $forecastResults['list'];

        // Extract the forecast for all available days
        $extendedForecast = [];
        $currentDate = null;

        foreach ($forecastList as $forecastData) {
            $date = date('Y-m-d', $forecastData['dt']);

            // Include all available days
            if (!in_array($date, array_column($extendedForecast, 'date'))) {
                $extendedForecast[] = [
                    'date' => $date,
                    'weather' => $forecastData['weather'][0], // Assuming you want weather details
                    'temperature' => $forecastData['main']['temp'], // Assuming you want temperature
                    // Add more details as needed
                ];
            }
        }

        return $extendedForecast;
    }
}
