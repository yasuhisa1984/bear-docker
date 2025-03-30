<?php
namespace MyVendor\MyApp\Resource\Api;  // ← `Api` に変更！

use BEAR\Resource\ResourceObject;

class Shops extends ResourceObject
{
    public function onGet(): array
    {
        return [
            'shops' => [
                ['id' => 1, 'name' => 'Shop A'],
                ['id' => 2, 'name' => 'Shop B'],
                ['id' => 3, 'name' => 'Shop C']
            ]
        ];
    }
}

