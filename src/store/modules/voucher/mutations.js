const mutations = {
    // Readlist Voucher
    setPreloadVoucherList: function(state, payload) {
        state.voucher_list.isLoading = payload;
        return state;
    },
    setVoucherList: function(state, payload) {
        state.voucher_list.data = payload;
        return state;
    },
    setSearchFilter: function(state, payload) {
        state.voucher_list.filter.search = payload;
        return state;
    },
    setStatusFilter: function(state, payload) {
        state.voucher_list.filter.status = payload;
        return state;
    },
    setVoucherTypeFilter: function(state, payload) {
        state.voucher_list.filter.type = payload;
        return state;
    },
    setRegionFilter: function(state, payload) {
        state.voucher_list.filter.region_id = payload;
        return state;
    },
    setCustomerFilter: function(state, payload) {
        state.voucher_list.filter.customer_id = payload;
        return state;
    },
    setArchetypeFilter: function(state, payload) {
        state.voucher_list.filter.archetype_id = payload;
        return state;
    },
    setMembershipLevelFilter: function(state, payload) {
        state.voucher_list.filter.membership_level_id = payload;
        return state;
    },
    setMembershipLapakFilter: function(state, payload) {
        state.voucher_list.filter.membership_checkpoint_id = payload;
        return state;
    },
    resetFilter: function(state, payload) {
        state.voucher_list.filter = {
            search: '',
			status: 1,
			type:'',
			region_id: '',
			customer_id: '',
			archetype_id: '',
			membership_level_id : '',
			membership_checkpoint_id: '',
        };
        return state;
    },
    setDataBulky: function(state, payload) {
        state.voucher_list.data_bulky = payload;
        return state;
    },
    setConfirmBulkyVoucher: function(state, payload) {
        state.voucher_list.confirm_data = payload;
        return state;
    },
    setErrorBulky: function(state, payload) {
        state.voucher_list.error = payload;
        return state;
    },
    setResponseUploadBulkVoucher: function(state, payload) {
        state.voucher_list.isSuccess = payload;
        return state;
    },

    // Archive Voucher
    setArchiveVoucher: function(state, payload) {
        state.voucher_archive.confirm_data = payload;
        return state;
    },

    // Detail Voucher
    setPreloadVoucherDetail: function(state, payload) {
        state.voucher_detail.isLoading = payload;
        return state;
    },
    setVoucherDetail: function(state, payload) {
        state.voucher_detail.data = payload;
        return state;
    },
    setVoucherAuditLog: function(state, payload) {
        state.voucher_detail.data_audit_log = payload;
        return state;
    },

    // Create Voucher
    setVoucherTypeCreate: function(state, payload) {
        state.voucher_create.form.type = payload;
        return state;
    },
    setRegionCreate: function(state, payload) {
        state.voucher_create.form.region_id = payload;
        return state;
    },
    setCustomerTypeCreate: function(state, payload) {
        state.voucher_create.form.customer_type_id = payload;
        return state;
    },
    setArchetypeCreate: function(state, payload) {
        state.voucher_create.form.archetype_id = payload;
        return state;
    },
    setCustomerCreate: function(state, payload) {
        state.voucher_create.form.customer_id = payload;
        return state;
    },
    setDivisionCreate: function(state, payload) {
        state.voucher_create.form.division_id = payload;
        return state;
    },
    setMembershipLevelCreate: function(state, payload) {
        state.voucher_create.form.membership_level_id = payload;
        return state;
    },
    setMembershipCheckpointCreate: function(state, payload) {
        state.voucher_create.form.membership_checkpoint_id = payload;
        return state;
    },
    setStartTimeCreate: function(state, payload) {
        state.voucher_create.form.start_time = payload;
        return state;
    },
    setEndTimeCreate: function(state, payload) {
        state.voucher_create.form.end_time = payload;
        return state;
    },
    setImageCreate: function(state, payload) {
        state.voucher_create.form.image_url = payload;
        return state;
    },
    addItemCreate: function(state, payload) {
        state.voucher_create.form.voucher_item.splice(payload.idx, 1, {item_id: payload.item_id, uom: payload.uom, product: payload.product});
        return state;
    },
    removeItemCreate: function(state, payload) {
        state.voucher_create.form.voucher_item.splice(payload.idx, 1)
        return state;
    },
    setCreateVoucher: function(state, payload) {
        state.voucher_create.confirm_data = payload;
        return state;
    },
    setErrorCreate: function(state, payload) {
        state.voucher_create.error = payload;
        return state;
    },
    setErrorImageCreate: function(state, payload) {
        state.voucher_create.error.image_url = payload;
        return state;
    },
    setVoucherCreate: function(state, payload) {
        state.voucher_create.form = {
            redeem_code: '',
			name: '',
			type: 0,
			region_id: null,
			customer_type_id: null,
			archetype_id: null,
			customer_id: null,
			division_id: null,
			start_time: null,
			end_time: null,
			overall_quota: null,
			user_quota: null,
			min_order: '',
			disc_amount: null,
			note: '',
			voucher_item: [],
			term_conditions: '',
			image_url: '',
			membership_level_id: null,
			membership_checkpoint_id: null,
        };
        return state;
    },
    resetDateCreate: function(state, payload) {
        state.voucher_create.date = {
            start_date : {
                input : new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
                model : '',
            },
            start_time : {
                input : '',
                model : '',
            },
            finish_date : {
                input : '',
                model : '',
            },
            finish_time : {
                input : '23:59',
                model : '',
            },
            current_date: new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
        };
        return state;
    },
    setCheckBox: function(state, payload){
        state.voucher_create.disabled = payload
    },

    // Bulk Voucher
    responseBulkTrue: function(state, payload) {
        state.voucher_list.dialog_bulky = {
            modal_bulk_voucher: false,
			clear: true,
			error_message: '',
			confirm_bulk_voucher: false,
            disabled_upload: true,
		}
    },
    responseBulkFalse: function(state, payload) {
        state.voucher_list.dialog_bulky = {
			modal_bulk_voucher: true,
			clear: false,
			error_message: '',
			confirm_bulk_voucher: false,
            disabled_upload: false,
		}
    },
    deteleFileExcel: function(state, payload) {
        state.voucher_list.data_bulky = []
        state.voucher_list.dialog_bulky = {
			confirm_bulk_voucher: false,
			error_message: '',
			modal_bulk_voucher: true,
            disabled_upload: true,
		}
        state.voucher_list.error = []
    }
};

export default mutations;
