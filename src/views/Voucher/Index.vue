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
            <v-row >
                <v-col class="flex-align-end">
                    <router-link :to="{ name: 'VoucherCreate' }" class="routerLink" v-privilege="'vou_crt'">
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="no-caps bold white--text"
                            data-unq="voucher-button-create"
                        >Create Voucher</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="list.table_headers"
                :items="list.data"
                :loading="list.isLoading"
                :items-per-page="10"
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
            </v-data-table>
        </div>
        <ConfirmationDialogNew :data-unq="`itemCategory-input-confirmDialog`" :sendData="confirm_data"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {
        name: "VoucherList",
        data() {
            return {
                show_filter : false,
                disabled_checkpoint: true,
            }
        },
        computed: {
            ...mapState({
                list: state => state.voucher.voucher_list,
                confirm_data: state => state.voucher.voucher_archive.confirm_data,
            }),
        },
        created() {
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
