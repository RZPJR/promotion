import http from "../../../services/http";
import Vue from 'vue';
import Pagination from "../pagination";

const actions = {
    // Readlist Voucher
    fetchVoucherList: async ({ commit, dispatch, state }, payload) => {
        commit("setPreloadVoucherList", true)
        commit("setVoucherList", [])
        try {
            let status = state.voucher_list.filter.status === 999 ? '' : state.voucher_list.filter.status
            let pagination = Pagination.state.pagination
            const response = await http.get('/voucher',{params: {
                page: pagination.page,
                per_page : pagination.rows_per_page,
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
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
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

    // Get Division
    fetchDivision: async ({ state, commit, dispatch }, payload) => {
        try {
            const response = await http.get("account/v1/division/default", {
                params: {
                    customer_type_id: payload,
                }
            }, true);
            let data = response.data.data
            if (data){
                commit("setDivisionObj", data)
                commit("setDivisionCreate", data.id)
            }
        }catch (error) {
            console.log(error);
        }
    },
}

export default actions;

