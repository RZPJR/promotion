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
};

export default mutations;
