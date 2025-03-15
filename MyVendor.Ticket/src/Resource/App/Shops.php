<?php

declare(strict_types=1); // ✅ declare(strict_types=1) は最初に書く

namespace MyVendor\Ticket\Resource\App; // ✅ namespace は必ず declare の直後
use MyVendor\Ticket\Query\TicketQueryInterface;

use BEAR\Resource\ResourceObject;

class Shops extends ResourceObject
{
    function __construct(
        private TicketQueryInterface $query,
    ) {
    }

    public function onGet(): static
    {
        $shops = (array) $this->query->list_shop(); // 必ず配列に変換
        $this->body = ['shops' => $shops];

        return $this;
    }
}

