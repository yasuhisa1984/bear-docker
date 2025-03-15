<?php
declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class ShopsSeeder extends AbstractSeed
{
    public function run(): void
    {
        $data = [];
        for ($i = 0; $i < 5; $i++) {
            $data[] = [
                'group_id' => rand(1, 5),
                'agency_id' => rand(1, 5),
                'secondary_agency_id' => rand(1, 5),
                'connect_agency_id' => null,
                'manage_code_id' => null,
                'name' => "ショップ" . chr(65 + $i),
                'name_kn' => "ショップ" . chr(65 + $i) . "カナ",
                'tel' => '03-' . rand(1000, 9999) . '-' . rand(1000, 9999),
                'fax' => null,
                'zipcode' => str_pad((string)rand(1000000, 9999999), 7, '0', STR_PAD_LEFT),
                'pref_code' => rand(1, 47),
                'address' => '東京都中央区 ' . rand(1, 10) . '-丁目',
                'station' => '東京駅',
                'chief' => '山田 太郎',
                'company_chief' => '鈴木 次郎',
                'account_notification_date' => '2024-01-01',
                'contract_date' => '2024-01-15',
                'bm_plan_division' => 2,
                'start_date' => '2024-02-01',
                'option_start_date' => '2024-03-01',
                'performance_based_reward_date' => null,
                'finish_date' => null,
                'finish_note' => null,
                'system_shutdown_date' => null,
                'bm_cancellation_reason_note' => null,
                'transition_management_system_type' => 1,
                'transition_pos_system_type' => 1,
                'fee_initial' => 50000,
                'fee_monthly' => 20000,
                'fee_connect' => 3000,
                'fee_option' => null,
                'fee_half_flag' => 0,
                'ec_use_flag' => 1,
                'ticket_use_flag' => 1,
                'plan_use_flag' => 0,
                'purchase_details_use_flag' => 0,
                'ticket_sum_billing_division' => 1,
                'commission' => 10.0,
                'commission_ticket_monthly' => 5.0,
                'commission_ticket_times' => 3.0,
                'commission_plan' => 2.0,
                'ec_memo' => null,
                'bills_memo' => null,
                'bills_status' => 0
            ];
        }
        
        $this->table('shops')->insert($data)->saveData();
    }
}

