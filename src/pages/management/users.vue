<script setup>
import { ref, reactive } from 'vue'
import { Form, message } from 'ant-design-vue'
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons-vue'
import { COLORS } from '@/style/colors'
import yapi from '../../api/yapi'

const columns = [
	{
		title: '名稱',
		dataIndex: 'name',
	},
	{
		title: '角色',
		dataIndex: 'role',
	},
	{
		title: '團隊',
		dataIndex: 'teams',
	},
	{
		title: '電子郵件',
		dataIndex: 'email',
	},
	{
		title: '電話',
		dataIndex: 'phone',
	},
	{
		title: '狀態',
		dataIndex: 'status',
		width: '8%',
	},
	{
		title: '操作',
		dataIndex: 'actions',
		width: '10%',
	},
]
const calTagColor = (status) => {
	switch (status) {
		case 'active':
			return 'primary'
		case 'suspended':
			return 'error'
		default:
			return 'primary'
	}
}
const statusText = (status) => {
	switch (status) {
		case 'active':
			return '使用中'
		case 'suspended':
			return '已停權'
		default:
			return '使用中'
	}
}
// 取得所有使用者資料
const dataSource = ref([])
yapi
	.get('/users')
	.then((res) => {
		if (res.status === 200) return res.data
	})
	.then((data) => {
		dataSource.value = data
	})

// 新增
const isAddUserModalOpen = ref(false)
const initialValues = {
	name: '',
	role: '一般使用者',
	teams: [],
	email: '',
	phone: 'ext. ',
	status: 'active',
}
const formData = reactive({ ...initialValues })
const formRules = reactive({
	name: [{ required: true, message: '此為必填欄位' }],
	role: [{ required: true, message: '此為必填欄位' }],
	teams: [{ required: true, message: '此為必填欄位' }],
	email: [
		{ required: true, message: '此為必填欄位' },
		{ type: 'email', message: '電子郵件格式有誤', trigger: 'blur' },
	],
})

const { resetFields, validate, validateInfos } = Form.useForm(
	formData,
	formRules
)

const addUser = () => {
	validate()
		.then(() => {
			dataSource.value.push({
				id: String(dataSource.value.length + 1),
				...formData,
			})
			resetFields()
			isAddUserModalOpen.value = false
			setTimeout(() => {
				message.success('新增成功！', 1.5)
			}, 100)
		})
		.catch((err) => console.log('error ', err))
}

// 刪除
const deleteUser = (id) => {
	const remainUsers = dataSource.value.filter((user) => user.id !== id)
	dataSource.value = remainUsers
	setTimeout(() => {
		message.success('刪除成功', 1.5)
	}, 100)
}

// 編輯
const isEditUserModalOpen = ref(false)
const editFormData = reactive({})
const openEditModal = (id) => {
	const target = dataSource.value.filter((user) => user.id === id)[0]
	if (!target) return
	Object.assign(editFormData, { ...target })
	isEditUserModalOpen.value = true
}
const {
	resetFields: resetEditFields,
	validate: validateEditForm,
	validateInfos: validateEditFormInfos,
} = Form.useForm(editFormData, formRules)

const editUser = (id) => {
	validateEditForm().then(() => {
		dataSource.value = dataSource.value.map((user) => {
			if (user.id !== id) return user
			return { ...editFormData }
		})
		isEditUserModalOpen.value = false
		setTimeout(() => {
			message.success('編輯成功！', 1.5)
		}, 100)
	})
}
</script>

<template>
	<h2 class="text-2xl font-semibold mb-8">帳號管理</h2>
	<div class="mb-4">
		<BasicButton type="primary" @click="isAddUserModalOpen = true">
			<PlusOutlined />新增
		</BasicButton>
		<a-modal
			v-model:visible="isAddUserModalOpen"
			ok-text="新增"
			cancel-text="取消"
			@ok="addUser"
		>
			<template #title>
				<h3 class="font-semibold">新增使用者</h3>
			</template>
			<a-form :model="formData" :label-col="{ span: 6 }">
				<a-form-item label="使用者名稱" v-bind="validateInfos.name">
					<a-input v-model:value="formData.name" />
				</a-form-item>
				<a-form-item label="角色" v-bind="validateInfos.role">
					<a-select v-model:value="formData.role">
						<a-select-option value="一般使用者">一般使用者</a-select-option>
						<a-select-option value="管理員">管理員</a-select-option>
						<a-select-option value="超級管理員">超級管理員</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="團隊" v-bind="validateInfos.teams">
					<a-checkbox-group
						v-model:value="formData.teams"
						class="custom-checkbox-group"
					>
						<a-checkbox value="繹宇數位" v-bind="validateInfos.teams"
							>繹宇數位</a-checkbox
						>
						<a-checkbox value="專案部" v-bind="validateInfos.teams"
							>專案部</a-checkbox
						>
						<a-checkbox value="研發部" v-bind="validateInfos.teams"
							>研發部</a-checkbox
						>
						<a-checkbox value="客服業務部" v-bind="validateInfos.teams"
							>客服業務部</a-checkbox
						>
						<a-checkbox value="夯特數據科技" v-bind="validateInfos.teams"
							>夯特數據科技</a-checkbox
						><a-checkbox value="夯特行銷部" v-bind="validateInfos.teams"
							>夯特行銷部</a-checkbox
						>
					</a-checkbox-group>
				</a-form-item>
				<a-form-item label="電子郵件" v-bind="validateInfos.email">
					<a-input v-model:value="formData.email" />
				</a-form-item>
				<a-form-item label="電話" v-bind="validateInfos.phone">
					<a-input v-model:value="formData.phone" />
				</a-form-item>
				<a-form-item label="帳號狀態">
					<a-radio-group v-model:value="formData.status">
						<a-radio value="active">使用中</a-radio>
						<a-radio value="suspended">停權</a-radio>
					</a-radio-group>
				</a-form-item>
			</a-form>
		</a-modal>
		<a-modal
			v-model:visible="isEditUserModalOpen"
			ok-text="儲存"
			cancel-text="取消"
			@ok="editUser(editFormData.id)"
		>
			<template #title>
				<h3 class="font-semibold">編輯使用者</h3>
			</template>
			<a-form :model="editFormData" :label-col="{ span: 6 }">
				<a-form-item label="使用者名稱" v-bind="validateEditFormInfos.name">
					<a-input v-model:value="editFormData.name" />
				</a-form-item>
				<a-form-item label="角色" v-bind="validateEditFormInfos.role">
					<a-select v-model:value="editFormData.role">
						<a-select-option value="一般使用者">一般使用者</a-select-option>
						<a-select-option value="管理員">管理員</a-select-option>
						<a-select-option value="超級管理員">超級管理員</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="團隊" v-bind="validateEditFormInfos.teams">
					<a-checkbox-group
						v-model:value="editFormData.teams"
						class="custom-checkbox-group"
					>
						<a-checkbox value="繹宇數位" v-bind="validateInfos.teams"
							>繹宇數位</a-checkbox
						>
						<a-checkbox value="專案部" v-bind="validateInfos.teams"
							>專案部</a-checkbox
						>
						<a-checkbox value="研發部" v-bind="validateInfos.teams"
							>研發部</a-checkbox
						>
						<a-checkbox value="客服業務部" v-bind="validateInfos.teams"
							>客服業務部</a-checkbox
						>
						<a-checkbox value="夯特數據科技" v-bind="validateInfos.teams"
							>夯特數據科技</a-checkbox
						><a-checkbox value="夯特行銷部" v-bind="validateInfos.teams"
							>夯特行銷部</a-checkbox
						>
					</a-checkbox-group>
				</a-form-item>
				<a-form-item label="電子郵件" v-bind="validateEditFormInfos.email">
					<a-input v-model:value="editFormData.email" />
				</a-form-item>
				<a-form-item label="電話" v-bind="validateEditFormInfos.phone">
					<a-input v-model:value="editFormData.phone" />
				</a-form-item>
				<a-form-item label="帳號狀態">
					<a-radio-group v-model:value="editFormData.status">
						<a-radio value="active">使用中</a-radio>
						<a-radio value="suspended">停權</a-radio>
					</a-radio-group>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
	<a-table :data-source="dataSource" :columns="columns">
		<template #bodyCell="{ column, text, record }">
			<template v-if="column.dataIndex === 'teams'">
				<span v-for="(team, index) in text">
					{{ team }}
					<span v-if="text.length > 1 && index !== text.length - 1">、</span>
				</span>
			</template>
			<template v-else-if="column.dataIndex === 'status'">
				<BasicTag :color="calTagColor(text)">{{ statusText(text) }}</BasicTag>
			</template>
			<template v-else-if="column.dataIndex === 'actions'">
				<div class="flex gap-2">
					<BasicButton @click="openEditModal(record.id)" size="small">
						<EditOutlined />
					</BasicButton>
					<a-popconfirm
						@confirm="deleteUser(record.id)"
						ok-text="刪除"
						cancel-text="取消"
						:okButtonProps="{ danger: true }"
					>
						<template #icon>
							<QuestionCircleOutlined :style="{ color: COLORS.danger }" />
						</template>
						<template #title>
							<p>確定要刪除這個帳號？</p>
						</template>
						<BasicButton danger size="small">
							<DeleteOutlined />
						</BasicButton>
					</a-popconfirm>
				</div>
			</template>
			<template v-else>
				{{ text }}
			</template>
		</template>
	</a-table>
</template>

<route lang="json">
{
	"meta": {
		"requiresLogin": true
	}
}
</route>

<style lang="scss" scoped>
.custom-checkbox-group {
	@apply flex flex-wrap gap-2;

	:deep(label) {
		margin: 0;
	}
}
</style>
