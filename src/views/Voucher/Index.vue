<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                v-model="list.filter.search"
                                dense
                                outlined
                                filled
                                placeholder="Search..."
                                prepend-inner-icon="search"
                                v-on="{ ...tooltip }"
                                data-unq="voucher-input-search"
                            ></v-text-field>
                        </template>
                    <span>Search by name, redeem code</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="show_filter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="show_filter = !show_filter"
                        v-if="show_filter"
                        class="no-caps fs12"
                        data-unq="voucher-button-hide"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="show_filter = !show_filter"
                        v-else
                        class="no-caps fs12"
                        data-unq="voucher-button-show"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="show_filter">
                <v-col cols="12" md="3" class="-mb24">
                    <v-select
                        v-model="list.filter.status"
                        label="Status"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                        data-unq="voucher-select-status"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectGlossary
                        @selected="voucherTypeSelected"
                        label="Voucher Type"
                        :norequired="true"
                        table="voucher"
                        attribute="type"
                        outlined
                        :dense="true"
                        data-unq="voucher-select-voucherType"
                    ></SelectGlossary>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectArea 
                        @selected="regionSelected"
                        :norequired="true"
                        :aux_data="2"
                        :dense="true"
                        data-unq="voucher-select-region"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectArchetype
                        @selected="archetypeSelected"
                        :norequired="true"
                        :aux_data="2"
                        :dense="true"
                        data-unq="voucher-select-archetype"
                    ></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectMembershipLevel
                        @selected="membershipLevelSelected"
                        label="Membership Level"
                        :norequired="true"
                        outlined
                        data-unq="voucher-select-membershipLevel"
                    ></SelectMembershipLevel>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectMembershipCheckpoint
                        :disabled="disabled_checkpoint"
                        @selected="membershipCheckpointSelected"
                        :level="list.filter.membership_level_id"
                        label="Membership Lapak"
                        :norequired="true"
                        outlined
                        data-unq="voucher-select-membershipCheckpoint"
                    ></SelectMembershipCheckpoint>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectCustomer
                        @selected="customerSelected"
                        :norequired="true"
                        :dense="true"
                    ></SelectCustomer>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <div class="flex-align-end">
                <v-row>
                    <v-col>
                        <router-link :to="{ name: 'VoucherCreate' }" class="routerLink" v-privilege="'vou_crt'">
                            <v-btn
                                depressed
                                color="#50ABA3"
                                class="no-caps bold white--text"
                                data-unq="voucher-button-create"
                            >
                                <span class="text-white bold">
                                    Create Voucher
                                </span>
                            </v-btn>
                        </router-link>
                    </v-col>
                    <v-col>
                        <v-btn
                            depressed
                            color="#50ABA3"
                            @click="list.dialog_bulky.modal_bulk_voucher=true, list.dialog_bulky.clear=false, BulkVoucher=true"
                            class="no-caps bold"
                            v-privilege="'vou_blk_imp'"
                            data-unq="voucher-button-bulk"
                        >
                            <span class="text-white bold">
                                Bulk Voucher
                            </span>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="list.table_headers"
                :items="list.data"
                :loading="list.isLoading"
                :items-per-page="pagination.rows_per_page"
                :server-items-length="Math.ceil(pagination.total_items/pagination.rows_per_page)"
                @update:items-per-page="getItemPerPage"
                @update:page="getPagination"
                :footer-props="{'items-per-page-options':[10,15,20,25]}"
                data-unq="voucher-table-listVoucher"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`voucher-value-redeemCode-${props.index}`">{{ props.item.redeem_code }}<br>
                            <span class="text-black60" :data-unq="`voucher-value-name-${props.index}`">{{ props.item.name }}</span>
                        </td>
                        <td :data-unq="`voucher-value-type-${props.index}`">{{ props.item.type===1 ? 'Total Discount' : props.item.type === 2 ? 'Delivery Discount' : 'Extra Edenpoint'}}</td>
                        <td :data-unq="`voucher-value-startEndTime-${props.index}`">{{ props.item.start_time | moment("DD/MM/YYYY HH:mm:ss") }} - {{ props.item.end_time | moment("DD/MM/YYYY HH:mm:ss") }}</td>
                        <td :data-unq="`voucher-value-membership-${props.index}`">
                            <div v-if="props.item.membership_level != null">
                                {{ props.item.membership_level.name }}<br>
                                <span
                                    v-if="props.item.membership_checkpoint != null"
                                    class="second-color"
                                >
                                    Lapak {{ props.item.membership_checkpoint.checkpoint }}
                                </span>
                            </div>
                            <div v-else>-</div>
                        </td>
                        <td :data-unq="`voucher-value-customer-${props.index}`">
                            <div v-if="props.item.customer != null">
                                {{ props.item.customer.code }} - {{ props.item.customer.name }}
                            </div>
                            <div v-else>-</div>
                        </td>
                        <td :data-unq="`voucher-value-voucherAmount-${props.index}`" class="right">Rp. {{ formatPrice(props.item.disc_amount) }}</td>
                        <td :data-unq="`voucher-value-overallQuota-${props.index}`" class="center">{{ props.item.overall_quota }}/{{ props.item.rem_overall_quota }}</td>
                        <td :data-unq="`voucher-value-region-${props.index}`">{{ props.item.region.description }}</td>
                        <td :data-unq="`voucher-value-archetype-${props.index}`">{{ props.item.archetype.description }}</td>
                        <td :data-unq="`voucher-value-status-${props.index}`">
                            <div v-if="props.item.status === 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status === 7">
                                <v-chip
                                    :color="statusMaster('archived')"
                                >Archived</v-chip>
                            </div>
                        </td>
                        <td :data-unq="`voucher-button-actionMenu-${props.index}`">
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item  :to="{name: 'VoucherDetail', params: { id: props.item.id }}" v-privilege="'vou_rdd'" data-unq="voucher-button-detail">
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>mdi-open-in-new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div v-if="props.item.status === 1"><hr/></div>
                                    <v-list-item v-privilege="'vou_arc'" @click="archiveVoucher({id: props.item.id})" v-if="props.item.status === 1" data-unq="voucher-button-archive">
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
                <template v-slot:[`footer.page-text`]="props">
                    {{ props.pageStart }} - {{ props.pageStop < 10 ? pagination.total_items : props.pageStop }} of {{ pagination.total_items }}
                </template>
            </v-data-table>
        </div>
        <!-- Dialog Bulk Voucher-->
        <v-dialog
            v-model="list.dialog_bulky.modal_bulk_voucher"
            persistent
            max-width="1200px"
            scrollable
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <v-row>
                        <v-col class="text-title-modal" cols="12" md="6">
                            Bulk Voucher
                        </v-col>
                        <v-col class="flex-align-end" cols="12" md="6">
                            <v-btn
                                icon
                                @click="list.dialog_bulky.modal_bulk_voucher=false, list.dialog_bulky.clear=true, list.dialog_bulky.error_message = '', list.error = [], list.dialog_bulky.disabled_upload=true"
                                data-unq="voucher-button-close"
                            >
                                <v-img :src='iconMinus' max-height="24px" max-width="24px"></v-img>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>
                <div class="hr-title-modal"/>
                <v-card-text class="mt5">
                    <v-alert
                        color="#2A89A7"
                        dark
                        outlined
                    >
                        <v-icon color="#2A89A7" class="-mt3">mdi-alert-circle-outline</v-icon> 
                        Please follow the step to upload Bulk Voucher
                    </v-alert>
                    <v-row class="mt20 mb10">
                        <v-col style="border-right: 1px dashed lightgrey;" class="pa-8">
                            <div>
                                Step 1. Download Template
                            </div>
                            <div class="text-black60">
                                Download template to create your bulk voucher
                            </div>
                            <div class="mt-3 bg-black10" style="border: 2px dashed #AAAAAA; min-height:220px; text-align: center;">
                                <div>
                                    <img width="60" class="mt50 mb8" :src='img_download' alt="">
                                </div>
                                <div class="mt-4">
                                    <v-btn
                                        depressed
                                        color="#50ABA3"
                                        class="only-btn white--text rounded-form mt10"
                                        @click="downloadTempBulkVoucher()"
                                        data-unq="voucher-button-downloadTemplate"
                                    >Download Template</v-btn>
                                </div>
                            </div>
                        </v-col>
                        <v-col style="border-right: 1px dashed lightgrey;" class="pa-8">
                            <div>
                                Step 2. Update Template
                            </div>
                            <div class="text-black60">
                                Update with spreadsheet application
                            </div>
                            <v-img width="250px" class="mt-2" :src='img_worktime' alt="" />
                        </v-col>
                        <v-col class="pa-8">
                            <div>
                                Step 3. Upload File<span class="text-red">*</span>
                            </div>
                            <div class="text-black60">
                                Voucher will be create on list after upload
                            </div>
                            <div class="mt10">
                                <UploadExcel
                                    @onSelect="onSelectBulkVoucher"
                                    @onDelete="onDeleteBulkVoucher"
                                    :clear="list.dialog_bulky.clear"
                                    :error="list.dialog_bulky.error_message"
                                    data-unq="voucher-button-uploadExcel"
                                ></UploadExcel>
                            </div>
                            <v-card-actions class="mt20">
                                <v-spacer></v-spacer>
                                <v-btn
                                    :disabled="list.dialog_bulky.disabled_upload"
                                    depressed
                                    color="#50ABA3"
                                    class="main-btn white--text"
                                    @click="list.dialog_bulky.confirm_bulk_voucher=true, list.dialog_bulky.modal_bulk_voucher=false"
                                    data-unq="voucher-button-upload"
                                >
                                    Upload
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                    <div :hidden="error.length > 0? false : true" class="box-modal-table ma10">
                        <v-spacer></v-spacer>
                        <v-data-table
                            :headers="list.headersBulkError"
                            :items="error"
                            :items-per-page="5"
                        >
                            <template v-slot:item="props">
                                <tr style="height:30px">
                                    <td :data-unq="`voucher-value-errBulk-${props.index}`">{{ props.item.item }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Dialog Bulk Voucher - Confirmation-->
        <v-dialog
            v-model="list.dialog_bulky.confirm_bulk_voucher"
            persistent
            max-width="470px"
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <span class="text-title-modal">Create Bulk Voucher</span>
                </v-card-title>
                <v-card-text>
                    <span class="fs16 mt-1">Are you sure to create this bulk voucher?</span>
                </v-card-text>
                <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="list.dialog_bulky.confirm_bulk_voucher=false, list.dialog_bulky.modal_bulk_voucher=true"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                    >
                        <span class="text-black80">No</span>
                    </v-btn>
                    <v-btn
                        class="main-btn white--text"
                        depressed
                        color="#50ABA3"
                        @click="uploadBulkVoucher(), list.dialog_bulky.modal_bulk_voucher=false"
                    >Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <ConfirmationDialogNew :data-unq="`voucher-input-confirmDialog`" :sendData="confirm_data"/>
        <ConfirmationDialogNew :data-unq="`voucher-input-confirmDialog`" :sendData="confirm_data_bulky"/>
    </v-container>
</template>

<script>
    import { Download } from "@vue-mf/global";
    import { Worktime } from "@vue-mf/global";
    import { Minus } from "@vue-mf/global";
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {
        name: "VoucherList",
        components: { Download, Worktime, Minus },
        data() {
            return {
                show_filter : false,
                disabled_checkpoint: true,
                iconMinus: Minus,
                img_download: Download,
                img_worktime: Worktime,
            }
        },
        computed: {
            ...mapState({
                list: state => state.voucher.voucher_list,
                confirm_data: state => state.voucher.voucher_archive.confirm_data,
                confirm_data_bulky: state => state.voucher.voucher_list.confirm_data,
                error: state => state.voucher.voucher_list.error,
                pagination: state => state.voucher.voucher_list.pagination,
            }),
        },
        created() {
            this.$store.commit("resetFilter")
            this.fetchVoucherList()
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchVoucherList()
                }
            });
        },
        methods: {
            ...mapActions([
                "fetchVoucherList",
                "archiveVoucher",
                "uploadBulkVoucher",
            ]),
            // For Filter by Region
            voucherTypeSelected(d){
                this.$store.commit("setVoucherTypeFilter", "")
                if(d){
                    this.$store.commit("setVoucherTypeFilter", d.value)
                }
                this.fetchVoucherList()
            },
            // For Filter by Region
            regionSelected(d){
                this.$store.commit("setRegionFilter", "")
                if(d){
                    this.$store.commit("setRegionFilter", d.id)
                }
                this.fetchVoucherList()
            },
            // For Filter by Customer
            customerSelected(d){
                this.$store.commit("setCustomerFilter", "")
                if(d){
                    this.$store.commit("setCustomerFilter", d.id)
                }
                this.fetchVoucherList()
            },
            // For Filter by Archetype
            archetypeSelected(d){
                this.$store.commit("setArchetypeFilter", "")
                if(d){
                    this.$store.commit("setArchetypeFilter", d.id)
                }
                this.fetchVoucherList()
            },
            // For Filter by Membership Level
            membershipLevelSelected(d){
                this.$store.commit("setMembershipLevelFilter", "")
                if(d){
                    this.$store.commit("setMembershipLevelFilter", d.id)
                    this.disabled_checkpoint = false
                }else{
                    this.disabled_checkpoint = true
                }
                this.fetchVoucherList()
            },
            // For Filter by Membership Lapak / Checkpoint
            membershipCheckpointSelected(d){
                this.$store.commit("setMembershipLapakFilter", "")
                if(d){
                    this.$store.commit("setMembershipLapakFilter", d.id)
                }
                this.fetchVoucherList()
            },
            // For download excel template bulk voucher
            downloadTempBulkVoucher() {
                window.location.href = process.env.VUE_APP_BULK_VOUCHER
            },
            // For listing bulk voucher
            onSelectBulkVoucher(file){
                this.list.dialog_bulky.error_message = file.length == 0 ? "No rows found" : ""
                let dataBulkVoucher = []
                file.forEach((item) => {
                    let value = {};
                    value.region_code = String(item.region_code);
                    value.archetype_code = String(item.archetype_code);
                    value.customer_code = String(item.customer_code);
                    value.division_code = String(item.division_code);
                    value.redeem_code = String(item.redeem_code);
                    value.voucher_name = String(item.voucher_name);
                    value.voucher_type = parseInt(item.voucher_type);
                    value.start_time = this.$moment(item.start_timestamp).format('YYYY-MM-DD HH:mm:ss');
                    value.end_time = this.$moment(item.end_timestamp).format('YYYY-MM-DD HH:mm:ss');
                    value.overall_quota = parseInt(item.overall_quota);
                    value.user_quota = parseInt(item.user_quota);
                    value.disc_amount = parseInt(item.voucher_amount);
                    value.min_order = parseInt(item.min_order);
                    value.note = String(item.note);
                    value.membership_level = parseInt(item.membership_level) ;
                    value.membership_checkpoint = parseInt(item.membership_lapak);

                    dataBulkVoucher.push(value)
                });
                this.$store.commit('setDataBulky', [])
                this.$store.commit('setDataBulky', dataBulkVoucher)
                this.list.dialog_bulky.disabled_upload = file.length == 0? true : false
            },
            // For reset when file bulk voucher remove
            onDeleteBulkVoucher(){
                this.$store.commit('deteleFileExcel')
            },
            // Count all data for paggination
            getItemPerPage(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    rows_per_page: val,
                })
                this.fetchVoucherList()
            },
            // For paggination
            getPagination(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    page: val,
                })
                this.fetchVoucherList()
            },
        },
        watch: {
            'list.filter.search': { // to filter by search box
                handler: function (val) {
                    this.$store.commit('setSearchFilter', val)
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchVoucherList()
                    }, 1000);
                },
                deep: true
            },
            'list.filter.status': {
                handler: function (val) {
                    if(val){
                        this.$store.commit('setStatusFilter', val)
                        this.fetchVoucherList()
                    }
                },
                deep: true
            },
        },
    }
</script>
