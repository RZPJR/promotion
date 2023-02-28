const state = {
	// Readlist Voucher
	voucher_list: {
		filter: {
			search: '',
			status: 1,
			type:'',
			region_id: '',
			customer_id: '',
			archetype_id: '',
			membership_level_id : '',
			membership_checkpoint_id: '',
		},
		isLoading: false,
		table_headers: [
			{
				text:'Redeem Code',
				width: "10%",
				class: 'grey--text text--darken-4',
				sortable: false,
			},
			{
				text:'Voucher Type',
				width: "10%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Start - End',
				width: "20%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Level',
				width: "10%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Customer Name',
				width: "15%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Voucher Amount',
				width: "15%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Voucher Quota',
				width: "5%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Region',
				width: "10%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Archetype',
				width: "10%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				text:'Status',
				width: "5%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
			{
				width: "5%",
				class: 'grey--text text--darken-4',
				sortable: false
			},
		],
		data: [],
	},

	// Archive Voucher
	voucher_archive: {
		confirm_data: {},
	},

	// Detail Voucher
	voucher_detail : {
		isLoading: false,
		data_audit_log: {},
		data:{}
	}
};

export default state;
