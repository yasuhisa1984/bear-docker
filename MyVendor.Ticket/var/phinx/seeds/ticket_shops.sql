INSERT INTO ticket (id, title, date_created)
VALUES 
    (UUID(), 'サンプルチケット1', NOW()),
    (UUID(), 'サンプルチケット2', NOW()),
    (UUID(), 'サンプルチケット3', NOW());

-- ランダムなshopsのサンプルデータを5件追加
INSERT INTO shops (
    group_id, agency_id, secondary_agency_id, connect_agency_id, manage_code_id,
    name, name_kn, tel, fax, zipcode, pref_code, address, station, chief,
    company_chief, account_notification_date, contract_date, bm_plan_division,
    start_date, option_start_date, performance_based_reward_date, finish_date,
    finish_note, system_shutdown_date, bm_cancellation_reason_note,
    transition_management_system_type, transition_pos_system_type,
    fee_initial, fee_monthly, fee_connect, fee_option, fee_half_flag,
    ec_use_flag, ticket_use_flag, plan_use_flag, purchase_details_use_flag,
    ticket_sum_billing_division, commission, commission_ticket_monthly,
    commission_ticket_times, commission_plan, ec_memo, bills_memo, bills_status
) VALUES
( FLOOR(RAND() * 5) + 1, FLOOR(RAND() * 5) + 1, FLOOR(RAND() * 5) + 1, NULL, NULL,
    'ショップA', 'ショップエー', '03-1234-5678', NULL, '1000001', 13,
    '東京都千代田区丸の内1丁目', '東京駅', '山田 太郎', '鈴木 次郎',
    '2024-01-01', '2024-01-15', 2,
    '2024-02-01', '2024-03-01', NULL, NULL,
    NULL, NULL, NULL,
    1, 1,
    50000, 20000, 3000, NULL, 0,
    1, 1, 0, 0,
    1, 10.0, 5.0,
    3.0, 2.0, NULL, NULL, 0
),
( FLOOR(RAND() * 5) + 1, FLOOR(RAND() * 5) + 1, FLOOR(RAND() * 5) + 1, NULL, NULL,
    'ショップB', 'ショップビー', '03-2345-6789', NULL, '1000002', 13,
    '東京都中央区日本橋2丁目', '日本橋駅', '佐藤 一郎', '高橋 三郎',
    '2024-02-01', '2024-02-15', 3,
    '2024-03-01', '2024-04-01', NULL, NULL,
    NULL, NULL, NULL,
    2, 2,
    60000, 25000, 3500, NULL, 1,
    0, 1, 1, 0,
    2, 12.0, 6.0,
    4.0, 3.0, NULL, NULL, 0
);

