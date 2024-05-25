<?php

namespace App\Providers;

use App\Events\FollowSelf;
use App\Listeners\AutoFollowSelf;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Welcome To Nexio')
                ->line('Click the button below to verify your email address.')
                ->action('Verify Email Address', $url);
        });

        Event::listen(
            FollowSelf::class,
            AutoFollowSelf::class
        );
    }
}
