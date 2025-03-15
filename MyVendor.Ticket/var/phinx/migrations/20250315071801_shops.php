<?php
use Phinx\Migration\AbstractMigration;

final class Shops extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('shops', ['id' => false, 'primary_key' => ['id']]);

        $table->addColumn('id', 'integer', ['signed' => false, 'identity' => true])
            ->addColumn('group_id', 'integer', ['signed' => false])
            ->addColumn('agency_id', 'integer', ['null' => true])
            ->addColumn('secondary_agency_id', 'integer', ['default' => 0])
            ->addColumn('connect_agency_id', 'integer', ['signed' => false, 'null' => true])
            ->addColumn('manage_code_id', 'integer', ['signed' => false, 'null' => true])
            ->addColumn('name', 'string', ['limit' => 255])
            ->addColumn('name_kn', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('tel', 'string', ['limit' => 16, 'null' => true])
            ->addColumn('fax', 'string', ['limit' => 16, 'null' => true])
            ->addColumn('zipcode', 'string', ['limit' => 7, 'null' => true])
            ->addColumn('pref_code', 'integer', ['signed' => false, 'null' => true])
            ->addColumn('address', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('station', 'string', ['limit' => 128, 'null' => true])
            ->addColumn('chief', 'string', ['limit' => 128, 'null' => true])
            ->addColumn('company_chief', 'string', ['limit' => 128, 'null' => true])
            ->addColumn('account_notification_date', 'date', ['null' => true])
            ->addColumn('contract_date', 'date', ['null' => true])
            ->addColumn('bm_plan_division', 'integer', ['default' => 0])
            ->addColumn('start_date', 'date', ['null' => true])
            ->addColumn('option_start_date', 'date', ['null' => true])
            ->addColumn('performance_based_reward_date', 'date', ['null' => true])
            ->addColumn('finish_date', 'date', ['null' => true])
            ->addColumn('finish_note', 'text', ['null' => true])
            ->addColumn('system_shutdown_date', 'date', ['null' => true])
            ->addColumn('bm_cancellation_reason_note', 'text', ['null' => true])
            ->addColumn('transition_management_system_type', 'integer', ['default' => 0])
            ->addColumn('transition_pos_system_type', 'integer', ['default' => 0])
            ->addColumn('fee_initial', 'integer', ['default' => 0, 'signed' => false])
            ->addColumn('fee_monthly', 'integer', ['default' => 0, 'signed' => false])
            ->addColumn('fee_connect', 'integer', ['null' => true, 'signed' => false])
            ->addColumn('fee_option', 'integer', ['null' => true, 'signed' => false])
            ->addColumn('fee_half_flag', 'integer', ['default' => 0])
            ->addColumn('ec_use_flag', 'integer', ['default' => 0])
            ->addColumn('ticket_use_flag', 'integer', ['default' => 0])
            ->addColumn('plan_use_flag', 'integer', ['default' => 0])
            ->addColumn('purchase_details_use_flag', 'integer', ['default' => 0])
            ->addColumn('ticket_sum_billing_division', 'integer', ['default' => 1])
            ->addColumn('commission', 'decimal', ['precision' => 4, 'scale' => 1, 'default' => 0.0])
            ->addColumn('commission_ticket_monthly', 'decimal', ['precision' => 4, 'scale' => 1, 'default' => 0.0])
            ->addColumn('commission_ticket_times', 'decimal', ['precision' => 4, 'scale' => 1, 'default' => 0.0])
            ->addColumn('commission_plan', 'decimal', ['precision' => 4, 'scale' => 1, 'default' => 0.0])
            ->addColumn('ec_memo', 'text', ['null' => true])
            ->addColumn('bills_memo', 'text', ['null' => true])
            ->addColumn('bills_status', 'integer', ['default' => 0])
            ->create();
    }
}

