<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="mb24">
                <v-col>
                    <v-img
                        class="rounded-form"
                        height="180"
                        width="360"
                        :src="detail.image_url"
                    ></v-img>
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <v-btn
                        v-if="detail.status === 1"
                        elevation="0"
                        rounded
                        small
                        class="no-caps mb4"
                        :color="statusMaster('active')"
                        data-unq="voucher-label-statusActive"
                    >
                        Active
                    </v-btn>
                    <v-btn
                        v-if="detail.status === 7"
                        elevation="0"
                        rounded
                        small
                        class="no-caps mb4"
                        :color="statusMaster('archived')"
                        data-unq="voucher-label-statusArchived"
                    >
                        Archived
                    </v-btn>
                    <div class="mx-3"></div>
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" data-unq="voucher-button-dotsVertical">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item v-if="detail.status === 1" @click="archiveVoucher({id: detail.id})" v-privilege="'vou_arc'" data-unq="voucher-button-archive">
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div v-if="detail.status == 1">
                                <hr/>
                            </div>
                            <v-list-item @click="seeHistory()" data-unq="voucher-button-history">
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Redeem Code'" :value="detail.redeem_code? detail.redeem_code : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Start Timestamp'" :value="detail.start_time | moment('DD/MM/YYYY HH:mm:ss')"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Voucher Type'" :value="detail.type === 1 ? 'Total Discount' : detail.type === 2 ? 'Delivery Discount' : 'Extra Edenpoint'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'End Timestamp'" :value="detail.end_time | moment('DD/MM/YYYY HH:mm:ss')"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Name'" :value="detail.name? detail.name : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Overall Quota'" :value="detail.overall_quota? detail.overall_quota : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Area'" :value="detail.region.description? detail.region.description : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Remaining Overall Quota'" :value="detail.rem_overall_quota? detail.rem_overall_quota : 0 "/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Customer Type'" :value="detail.archetype.customer_type? detail.archetype.customer_type.description : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Quota per User'" :value="detail.user_quota? detail.user_quota : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Archetype'" :value="detail.archetype.description? detail.archetype.description : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Minimum Order Amount'" :value="'Rp '+ formatPrice(detail.min_order)"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Customer Name'" :value="detail.customer ? detail.customer.code +' - ' + detail.customer.name : '-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Voucher Amount'" :value="'Rp '+ formatPrice(detail.disc_amount)"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Membership Level'" :value="detail.membership_level ? detail.membership_level.name :'-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Division'" :value="detail.division ? detail.division.description :'-'"/>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew :name="'Membership Lapak'" :value="detail.membership_checkpoint ? detail.membership_checkpoint.checkpoint :'-'"/>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <DetailRowNew :name="'Note'" :value="detail.note? detail.note : '-'" :align="true"/>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <DetailRowNew :name="'Term & Condition'" :value="detail.term_conditions ? detail.term_conditions :'-'" :align="true" />
                    </v-col>
                </v-row>
            </div>
        </div>
        <ConfirmationDialogNew :data-unq="`voucher-input-confirmDialog`" :sendData="confirm_data"/>
        <AuditLogNew :data-unq="`voucher-input-auditLog`" :data="data_audit_log"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "VoucherDetail",
        computed: {
            ...mapState({
                detail: state => state.voucher.voucher_detail.data,
                confirm_data: state => state.voucher.voucher_archive.confirm_data,
                data_audit_log: state => state.voucher.voucher_detail.data_audit_log,
            })
        },
        created() {
            this.fetchVoucherDetail({id: this.$route.params.id})
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res && this.$route.params.id != undefined) {
                    self.fetchVoucherDetail({id: this.$route.params.id})
                }
            });
        },
        methods:{
            ...mapActions([
                "fetchVoucherDetail",
                "archiveVoucher",
            ]),
            //For geting history data
            seeHistory() {
                this.$store.commit('setVoucherAuditLog', {})
                this.$store.commit('setVoucherAuditLog', {
                    model: true,
                    id: this.$route.params.id,
                    type: "voucher"
                })
            },
        }
    }
</script>