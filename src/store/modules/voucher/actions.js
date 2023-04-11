import http from "../../../services/http";
import Vue from 'vue'

const actions = {
    // Readlist Voucher
    fetchVoucherList: async ({ commit, dispatch, state }, payload) => {
        commit("setPreloadVoucherList", true)
        commit("setVoucherList", [])
        try {
            let status = state.voucher_list.filter.status === 999 ? '' : state.voucher_list.filter.status
            const response = await http.get('/voucher',{params: {
                page: 1,
                per_page: 100,
                order_by: '-id',
                search: state.voucher_list.filter.search,
                status: status,
                type: state.voucher_list.filter.type,
                region_id: state.voucher_list.filter.region_id,
                customer_id: state.voucher_list.filter.customer_id,
                archetype_id: state.voucher_list.filter.archetype_id,
                membership_level_id: state.voucher_list.filter.membership_level_id,
                membership_checkpoint_id: state.voucher_list.filter.membership_checkpoint_id,

            }});
            if(response.data.data && response.data.data !== null){
                commit("setVoucherList", response.data.data)
            }
            commit("setPreloadVoucherList", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadVoucherList", false)
        }
    },

    // Archive Voucher
    archiveVoucher: async ({ commit, state, dispatch }, payload) => {
        commit('setArchiveVoucher', {});
        commit('setArchiveVoucher', {
            model : true,
            status : true,
            statusMsg : "Success to Archive this Voucher",
            title : "Archive Voucher",
            text : "Are you sure want to Archive this Voucher?",
            urlApi : '/promotion/v1/voucher/archive/'+payload.id,
            data : {}
        });
    },

    // Voucher Detail
    fetchVoucherDetail: async ({ commit, dispatch, state }, payload) => {
        commit("setPreloadVoucherDetail", true)
        commit("setVoucherDetail", [])
        try {
            const response = await http.get('/voucher/'+payload.id);
            if(response.data.data && response.data.data !== null){
                commit("setVoucherDetail", response.data.data)
            }
            commit("setPreloadVoucherDetail", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadVoucherDetail", false)
        }
    },

    // Upload Bulky Voucher
    uploadBulkVoucher: async ({ commit, state, dispatch }, payload) => {
        let data = {
            data : state.voucher_list.data_bulky
        }
        await http.post("/voucher/bulky", data).then(response => {
            Vue.$toast.open({
                position: 'top-right',
                message: 'Data has been updated successfully',
                type: 'success',
            });
        }).then(() => {
            commit("setResponseUploadBulkVoucher", true)
            commit("responseBulkTrue")
            dispatch("fetchVoucherList")
        }).catch(e => {
            commit("setErrorBulky", [])
            let rowBulkError = e.errors.error_callback != null? e.errors.error_callback.slice(0, -1).split('|') : [];
            let err = []
            rowBulkError.forEach(e => {
                err.push({item: e})
            });
            commit("setErrorBulky", err)
            commit("responseBulkFalse")
        })
    },
}

export default actions;

