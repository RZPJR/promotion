<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            name="redeem_code"
                            v-model="form.redeem_code"
                            maxlength="20"
                            required
                            outlined
                            dense
                            :error-messages="error.redeem_code"
                            onkeypress="return event.charCode >= 97 && event.charCode <= 122 || event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 48 && event.charCode <= 57"
                            :data-unq="`voucher-input-redeemCode`"
                        >
                            <template v-slot:label>
                                Redeem Code<span style="color:red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-tooltip top>
                            <template v-slot:activator="{ on: tooltip }">
                                <div v-on="{ ...tooltip }">
                                    <v-text-field
                                        name="name"
                                        v-model="form.name"
                                        maxlength="20"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.name"
                                        :data-unq="`voucher-input-name`"
                                    >
                                        <template v-slot:label>
                                            Name<span style="color:red">*</span>
                                        </template>
                                    </v-text-field>
                                </div>
                            </template>
                            <span>Voucher name displayed on apps</span>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="typeSelected"
                            name="voucher_type"
                            label="Voucher Type"
                            table="voucher"
                            attribute="type"
                            :dense="true"
                            :error="error.type"
                            :data-unq="`voucher-select-voucherType`"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectArea
                            @selected="regionSelected"
                            name="region"
                            :dense="true"
                            :error="error.region_id"
                            :data-unq="`voucher-select-region`"
                        ></SelectArea>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectBusinessType
                            @selected="customerTypeSelected"
                            name="customer_type"
                            :dense="true"
                            :error="error.customer_type_id"
                            :data-unq="`voucher-select-customerType`"
                        ></SelectBusinessType>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectArchetype
                            @selected="archetypeSelected"
                            name="archetype"
                            :disabled="disabled_archetype"
                            :customer_type_id="form.customer_type_id"
                            :dense="true"
                            :error="error.archetype_id"
                            :data-unq="`voucher-select-archetype`"
                        ></SelectArchetype>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectCustomer
                            @selected="customerSelected"
                            :norequired="true"
                            name="customer"
                            :dense="true"
                            :error="error.customer_id"
                            :data-unq="`voucher-select-customer`"
                        ></SelectCustomer>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectDivision
                            @selected="divisionSelected"
                            name="division"
                            :dense="true"
                            :error="error.division_id"
                            :data-unq="`voucher-select-division`"
                        ></SelectDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-card elevation="0" outlined>
                            <v-card-text>
                                <div class="fs16 text-black">Start Time</div>
                            </v-card-text>
                            <v-card-text class="-mt12 -mb10">
                                <v-row>
                                    <v-col>
                                        <v-menu
                                            :data-unq="`voucher-input-startDate`"
                                            ref="menu"
                                            v-model="date.start_date.model"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <div v-on="on">
                                                    <v-text-field
                                                        :data-unq="`banner-input-startAt`"
                                                        name="start_at"
                                                        prepend-inner-icon="date_range"
                                                        outlined
                                                        v-model="date.start_date.input"
                                                        maxlength="10"
                                                        onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                                        :error-messages="error.start_time"
                                                        clearable
                                                        @click:clear="date.start_date.input = ''"
                                                        dense
                                                    >
                                                        <template v-slot:label>
                                                            Start Date<span class="text-red">*</span>
                                                        </template>
                                                    </v-text-field>
                                                </div>
                                            </template>
                                            <v-date-picker
                                                :data-unq="`banner-input-startAt`"
                                                v-model="date.start_date.input"
                                                @input="date.start_date.model = false"
                                                :min="date.current_date"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col>
                                        <v-menu
                                            :data-unq="`voucher-input-startTime`"
                                            ref="menuTime"
                                            v-model="date.start_time.model"
                                            :close-on-content-click="false"
                                            :return-value.sync="date.start_time.input"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    :data-unq="`banner-input-startTime`"
                                                    name="start_time"
                                                    prepend-inner-icon="schedule"
                                                    outlined
                                                    clearable
                                                    maxlength="5"
                                                    onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                    @click:clear="date.start_time.input = ''"
                                                    v-model="date.start_time.input"
                                                    :value="timeNow"
                                                    :error-messages="error.start_time"
                                                    dense
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <template v-slot:label>
                                                        Start Time<span class="text-red">*</span>
                                                    </template>
                                                </v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="24hr"
                                                :min="checkTimeStart"
                                                v-if="date.start_time.model"
                                                v-model="date.start_time.input"
                                                full-width
                                                @click:minute="$refs.menuTime.save(date.start_time.input)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-card elevation="0" outlined>
                            <v-card-text>
                                <div class="fs16 text-black">End Time</div>
                            </v-card-text>
                            <v-card-text class="-mt12 -mb10">
                                <v-row>
                                    <v-col>
                                        <v-menu
                                            :data-unq="`voucher-input-endDate`"
                                            ref="menu"
                                            v-model="date.finish_date.model"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <div v-on="on">
                                                    <v-text-field
                                                        :data-unq="`banner-input-finishAt`"
                                                        name="finish_at"
                                                        prepend-inner-icon="date_range"
                                                        outlined
                                                        v-model="date.finish_date.input"
                                                        onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                                        :error-messages="error.end_time"
                                                        clearable
                                                        @click:clear="date.finish_date.input = ''"
                                                        dense
                                                    >
                                                        <template v-slot:label>
                                                            End Date<span class="text-red">*</span>
                                                        </template>
                                                    </v-text-field>
                                                </div>
                                            </template>
                                            <v-date-picker
                                                v-model="date.finish_date.input"
                                                @input="date.finish_date.model = false"
                                                :min="date.current_date"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col>
                                        <v-menu
                                            :data-unq="`voucher-input-endTime`"
                                            ref="menuEndTime"
                                            v-model="date.finish_time.model"
                                            :close-on-content-click="false"
                                            :return-value.sync="date.finish_time.input"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    :data-unq="`banner-input-endTime`"
                                                    name="end_time"
                                                    prepend-inner-icon="schedule"
                                                    outlined
                                                    clearable
                                                    maxlength="5"
                                                    onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                    @click:clear="date.finish_time.input = ''"
                                                    v-model="date.finish_time.input"
                                                    :error-messages="error.end_time"
                                                    dense
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <template v-slot:label>
                                                        End Time<span class="text-red">*</span>
                                                    </template>
                                                </v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="24hr"
                                                :min="checkTimeEnd"
                                                v-if="date.finish_time.model"
                                                v-model="date.finish_time.input"
                                                full-width
                                                @click:minute="$refs.menuEndTime.save(date.finish_time.input)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            name="overall_quota"
                            v-model.number="form.overall_quota"
                            maxlength="8"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                            required
                            outlined
                            dense
                            :error-messages="error.overall_quota"
                            :data-unq="`voucher-input-overallQuota`"
                        >
                            <template v-slot:label>
                                Overall Quota<span style="color:red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            name="user_quota"
                            v-model.number="form.user_quota"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                            maxlength="8"
                            required
                            outlined
                            dense
                            :error-messages="error.user_quota"
                            :data-unq="`voucher-input-userQuota`"
                        >
                            <template v-slot:label>
                                Quota Per User<span style="color:red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            name="min_order"
                            v-model="form.min_order"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                            maxlength="12"
                            required
                            outlined
                            dense
                            :error-messages="error.min_order"
                            :data-unq="`voucher-input-minOrder`"
                        >
                            <template v-slot:label>
                                Minimum Order<span style="color:red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            name="disc_amount"
                            v-model.number="form.disc_amount"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                            maxlength="12"
                            required
                            outlined
                            dense
                            :error-messages="error.disc_amount"
                            :data-unq="`voucher-input-discAmount`"
                        >
                            <template v-slot:label>
                                Voucher Amount<span style="color:red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <v-textarea
                            name="note"
                            v-model="form.note"
                            :counter="100"
                            maxlength="100"
                            outlined
                            dense
                            rows="3"
                            :data-unq="`voucher-input-note`"
                        >
                            <template v-slot:label>
                                <div>
                                    Note
                                </div>
                            </template>
                        </v-textarea>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectMembershipLevel
                            @selected="membershipLevelSelected"
                            :norequired="true"
                            label="Membership Level"
                            name="membership_level"
                            outlined
                            :error="error.membership_level_id"
                            :data-unq="`voucher-select-membershipLevel`"
                        ></SelectMembershipLevel>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectMembershipCheckpoint
                            :disabled="disabled_checkpoint"
                            @selected="membershipCheckpointSelected"
                            :norequired="true"
                            :level="form.membership_level_id"
                            label="Membership Lapak"
                            name="membership_checkpoint"
                            outlined
                            :error="error.membership_checkpoint_id"
                            :data-unq="`voucher-select-membershipLapak`"
                        ></SelectMembershipCheckpoint>
                    </v-col>
                    <v-col cols="12" md="9" class="-mt24">
                        <v-textarea
                            name="note"
                            v-model="form.term_conditions"
                            :counter="500"
                            maxlength="500"
                            outlined
                            dense
                            rows="6"
                            :error-messages="error.term_conditions"
                            :data-unq="`voucher-input-termConditions`"
                        >
                            <template v-slot:label>
                                Term and Condition<span class="text-red">*</span>
                            </template>
                        </v-textarea>
                    </v-col>
                    <v-col cols="12" md="3" class="-mt24">
                        <UploadImage
                            :minWidth="360"
                            :minHeight="180"
                            :maxSize="3000"
                            :forImgName="'v'"
                            :type="'voucher'"
                            :extention="'jpeg'"
                            :accept="'image/jpeg,image/jpg'"
                            :notUseLabel="true"
                            :errorMsg="error.image_url"
                            :data-unq="`voucher-upload-image`"
                        ></UploadImage>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-header-table">
            Items
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="table_headers"
                :items="form.voucher_item"
                :hide-default-footer="true"
                :items-per-page="-1"
                :data-unq="`voucher-table-listItems`"
            >
                <template v-slot:no-data>
                    <v-btn
                        name="items"
                        @click="addItem()"
                        depressed
                        color="#50ABA3"
                        class="only-btn white--text"
                        :data-unq="`voucher-button-addItem`"
                    >
                        Add Item
                    </v-btn>
                </template>
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`voucher-value-index-${props.index}`">{{ props.index + 1 }}</td>
                        <td :data-unq="`voucher-input-item-${props.index}`">
                            <SelectItemTable
                                :name="`voucher_item_${props.index}`"
                                @selected="itemSelected($event, props.index)"
                                :error="errItem(props.index)"
                            ></SelectItemTable>
                        </td>
                        <td :data-unq="`voucher-value-uom-${props.index}`">{{ props.item.uom }}</td>
                        <td :data-unq="`voucher-input-minQtyDisc-${props.index}`">
                            <vue-numeric
                                :name="`min_qty_disc${props.index}`"
                                :class="errQty(props.index) ? 'productNumeric' : 'productNumericErr'"
                                separator="."
                                placeholder="0,00"
                                :precision="2"
                                v-model="props.item.min_qty_disc"
                            ></vue-numeric>
                            <div class="mt-1 ml-3 fs12 text-red v-messages__message">{{errQty2(props.index)}}</div>
                        </td>
                        <td :data-unq="`voucher-button-tabelAction-${props.index}`">
                            <div class="d-flex justify-end">
                                <div v-if="props.index == form.voucher_item.length-1">
                                    <v-btn
                                        v-if="form.voucher_item.length < 10"
                                        icon
                                        name="addItem"
                                        @click="addItem()"
                                        :data-unq="`voucher-button-addItem-${props.index}`"
                                    >
                                        <img :src='iconPlus' height="22px" width="22px"/>
                                    </v-btn>
                                </div>
                                <div>
                                    <v-btn
                                        icon
                                        @click="removeItem(props.index)"
                                        :data-unq="`voucher-button-removeItem-${props.index}`"
                                    >
                                        <img :src='iconMinus' height="20px" width="20px"/>
                                    </v-btn>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <div class="box">
            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            depressed
                            outlined
                            color="#EBEBEB" 
                            class="main-btn"
                            @click="$router.go(-1)"
                            :data-unq="`voucher-button-cancel`"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            v-privilege="'vou_crt'"
                            @click="setCreateVoucher()"
                            :data-unq="`voucher-button-save`"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :data-unq="`voucher-input-confirmDialog`" :sendData="confirm_data"/>
    </v-container>
</template>

<script>
    import { Plus } from "@vue-mf/global";
    import { Minus } from "@vue-mf/global";
    import { mapState, mapActions, mapMutations } from "vuex";
    
    export default {
        name: "VoucherDetail",
        components: { Plus, Minus },
        data() {
            return {
                disabled_archetype: true,
                disabled_checkpoint: true,
                iconPlus: '',
                iconMinus: '',
            }
        },
        computed: {
            ...mapState({
                form: state => state.voucher.voucher_create.form,
                date: state => state.voucher.voucher_create.date,
                table_headers: state => state.voucher.voucher_create.table_headers,
                error: state => state.voucher.voucher_create.error,
                confirm_data: state => state.voucher.voucher_create.confirm_data,
            }),
            // Check and save current time
            timeNow() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.date.start_time.input === "") {
                    return this.date.start_time.input = time
                }
            },
            // Check for min time
            checkTimeStart() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.date.current_date == this.date.start_date.input) {
                    return time
                }
            },
            // Check for min time
            checkTimeEnd() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.date.current_date == this.date.finish_date.input) {
                    return time
                }
            },
        },
        mounted() {
            this.$store.commit('setVoucherCreate')
            this.$store.commit('resetDateCreate')
            this.$store.commit('setErrorCreate', {})
            this.$store.commit('setErrorImageCreate', '')
            
            let self = this
            this.$root.$on('event_error', function (err) {
                self.$store.commit('setErrorCreate', {})
                if (err) {
                    self.$store.commit('setErrorCreate', err)
                }
            });
            this.$root.$on('event_uploadImage', function (image) {
                self.$store.commit('setImageCreate', '')
                if (image) {
                    self.$store.commit('setImageCreate', image)
                }
            });
        },
        methods: {
            ...mapActions([
                "createVoucher",
            ]),
            setCreateVoucher(){
                this.$store.commit('setStartTimeCreate', null)
                if (this.date.start_date.input && this.date.start_time.input) {
                    let value = this.date.start_date.input + 'T' + this.date.start_time.input
                    this.$store.commit('setStartTimeCreate', this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ'))
                }
                this.$store.commit('setEndTimeCreate', null)
                if (this.date.finish_date.input && this.date.finish_time.input) {
                    let value = this.date.finish_date.input + 'T' + this.date.finish_time.input
                    this.$store.commit('setEndTimeCreate', this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ'))
                }
                
                this.createVoucher()
            },
            // For Selected Voucher Type
            typeSelected(d) {
                this.$store.commit('setVoucherTypeCreate', 0)
                if (d) {
                    this.$store.commit('setVoucherTypeCreate', d.value)
                }
            },
            // For Selected Region
            regionSelected(d) {
                this.$store.commit('setRegionCreate', null)
                if (d) {
                    this.$store.commit('setRegionCreate', d.id)
                }
            },
            // For Selected Customer Type
            customerTypeSelected(d) {
                this.$store.commit('setCustomerTypeCreate', null)
                if (d) {
                    this.$store.commit('setCustomerTypeCreate', d.id)
                    this.disabled_archetype = false
                }else{
                    this.disabled_archetype = true
                }
            },
            // For Selected Archetype
            archetypeSelected(d) {
                this.$store.commit('setArchetypeCreate', null)
                if (d) {
                    this.$store.commit('setArchetypeCreate', d.id)
                }
            },
            // For Selected Archetype
            customerSelected(d) {
                this.$store.commit('setCustomerCreate', null)
                if (d) {
                    this.$store.commit('setCustomerCreate', d.id)
                }
            },
            // For Selected Archetype
            divisionSelected(d) {
                this.$store.commit('setDivisionCreate', null)
                if (d) {
                    this.$store.commit('setDivisionCreate', d.id)
                }
            },
            // For Selected Membership Level
            membershipLevelSelected(d) {
                this.$store.commit('setMembershipLevelCreate', null)
                if (d) {
                    this.$store.commit('setMembershipLevelCreate', d.id)
                    this.disabled_checkpoint = false
                }else{
                    this.disabled_checkpoint = true
                }
            },
            // For Selected Membership Checkpoint
            membershipCheckpointSelected(d) {
                this.$store.commit('setMembershipCheckpointCreate', null)
                if (d) {
                    this.$store.commit('setMembershipCheckpointCreate', d.id)
                }
            },
            // For Selected Item Table
            itemSelected(d, idx) {
                if (d) {
                    this.$store.commit('addItemCreate', {
                        idx: idx,
                        item_id: d.id,
                        uom: d.uom.name
                    })
                }
            },
            // For Adding new Item
            addItem() {
                this.iconPlus = Plus;
                this.iconMinus = Minus;
                this.form.voucher_item.push(
                    {
                        item_id: null,
                        uom: '',
                        min_qty_disc: null,
                    }
                )
            },
            // For Remove an Item
            removeItem(idx) {
                this.$store.commit('removeItemCreate', {idx: idx})
            },
            // For Error Qty
            errQty(idx) {
                for (var key in this.error) {
                    if (key == 'min_qty_disc' + idx) {
                        return false
                    }
                }
                return true
            },
            // For Error Qty
            errQty2(idx) {
                for (var key in this.error) {
                    if (key == 'min_qty_disc' + idx) {
                        return this.error[key]
                    }
                }
            },
            // For Error Item
            errItem(idx) {
                for (var key in this.error) {
                    if (key == 'item_id' + idx) {
                        return this.error[key]
                    }
                }
            },
        },
    }
</script>