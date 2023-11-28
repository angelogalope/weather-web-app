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

            return response()->json([
                'cityName' => $cityName,
                'forecast' => $forecastResults,
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

    public function defaultScreen(Request $request)
    {
        return response()->json(['message' => 'Please provide a place.'], 400);
    }

    private function processWeatherData($data)
    {
        $weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $weatherInfo = ['cityName' => "--" . $data['city']['name'] . "--"];

        for ($i = 0; $i < 5; $i++) {
            $minTemp = number_format($data['list'][$i]['main']['temp_min'] - 273.15, 1);
            $maxTemp = number_format($data['list'][$i]['main']['temp_max'] - 273.15, 2);

            $weatherInfo["day" . ($i + 1) . "Min"] = "Min: $minTemp°";
            $weatherInfo["day" . ($i + 1) . "Max"] = "Max: $maxTemp°";
            $weatherInfo["img" . ($i + 1)] = "http://openweathermap.org/img/wn/" . $data['list'][$i]['weather'][0]['icon'] . ".png";
            $weatherInfo["day" . ($i + 1)] = $weekdays[$this->checkDay($i)];
        }

        return $weatherInfo;
    }

    private function checkDay($day)
    {
        $d = now();
        return ($day + $d->dayOfWeek) > 6 ? $day + $d->dayOfWeek - 7 : $day + $d->dayOfWeek;
    }
}
