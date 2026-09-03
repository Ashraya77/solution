<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use App\Services\GeminiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function __construct(
        private GeminiService $geminiService
    ) {}

    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => [
                'required',
                'string',
                'max:2000',
            ],
        ]);

        $policy = Policy::where('is_active', true)->first();

        if (!$policy) {
            return response()->json([
                'message' => 'The chatbot is currently unavailable.',
            ], 503);
        }

        try {
            $answer = $this->geminiService->chat(
                $policy->content,
                $validated['message']
            );

            return response()->json([
                'message' => $answer,
            ]);
        } catch (\Throwable $e) {
            Log::error('Chatbot error', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Sorry, something went wrong. Please try again later.',
            ], 500);
        }
    }
}