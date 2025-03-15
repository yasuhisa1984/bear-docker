<?php

declare(strict_types=1);

namespace MyVendor\Ticket;

interface MyLoggerInterface
{
    public function log(string $message): void;
}
