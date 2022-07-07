import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
	state: () => {
		return {
			menuTree: [
				{
					id: '1',
					name: '主控台',
					path: '/dashboard',
					icon: 'DashboardOutlined',
					children: [],
				},
				{
					id: '2',
					name: '自動化流程',
					icon: 'ApartmentOutlined',
					children: [
						{
							id: '21',
							name: '選單一',
							path: '#321',
							icon: 'EditOutlined',
							children: [],
							breadcrumbs: [
								{
									name: '自動化流程',
									redirect: true,
									redirectPath: '#21',
								},
								{
									name: '選單一',
								},
							],
						},
						{
							id: '22',
							name: '選單二',
							path: '#22',
							icon: 'EditOutlined',
							children: [],
							breadcrumbs: [
								{
									name: '自動化流程',
									redirect: true,
									redirectPath: '#21',
								},
								{
									name: '選單二',
								},
							],
						},
						{
							id: '23',
							name: '選單三',
							path: '#23',
							icon: 'EditOutlined',
							children: [],
							breadcrumbs: [
								{
									name: '自動化流程',
									redirect: true,
									redirectPath: '#21',
								},
								{
									name: '選單三',
								},
							],
						},
					],
				},
				{
					id: '3',
					name: '結論分析',
					icon: 'ApartmentOutlined',
					children: [
						{
							id: '31',
							name: '專案報表',
							path: '#31',
							icon: 'EditOutlined',
							children: [],
							breadcrumbs: [
								{
									name: '結論分析',
									redirect: true,
									redirectPath: '#31',
								},
								{
									name: '專案報表',
								},
							],
						},
						{
							id: '32',
							name: '聯絡人報表',
							path: '#32',
							icon: 'EditOutlined',
							children: [],
							breadcrumbs: [
								{
									name: '結論分析',
									redirect: true,
									redirectPath: '#31',
								},
								{
									name: '聯絡人報表',
								},
							],
						},
						{
							id: '33',
							name: '更多報表',
							path: '#33',
							icon: 'EditOutlined',
							children: [
								{
									id: '331',
									name: '其他報表一',
									path: '#331',
									icon: 'EditOutlined',
									children: [],
									breadcrumbs: [
										{
											name: '結論分析',
											redirect: true,
											redirectPath: '#31',
										},
										{
											name: '更多報表',
											redirect: true,
											redirectPath: '#331',
										},
										{
											name: '其他報表一',
										},
									],
								},
								{
									id: '332',
									name: '其他報表二',
									path: '#332',
									icon: 'EditOutlined',
									children: [],
									breadcrumbs: [
										{
											name: '結論分析',
											redirect: true,
											redirectPath: '#31',
										},
										{
											name: '更多報表',
											redirect: true,
											redirectPath: '#331',
										},
										{
											name: '其他報表一',
										},
									],
								},
							],
						},
					],
				},
				{
					id: '5',
					name: '元件',
					icon: 'AppstoreOutlined',
					children: [
						{
							id: '51',
							name: 'General',
							path: '/components/general',
							children: [],
							breadcrumbs: [
								{
									name: '元件',
									redirect: true,
									redirectPath: '/components/general',
								},
								{
									name: 'General',
								},
							],
						},
						{
							id: '52',
							name: 'Navigation',
							path: '/components/navigation',
							children: [],
							breadcrumbs: [
								{
									name: '元件',
									redirect: true,
									redirectPath: '/components/general',
								},
								{
									name: 'Navigation',
								},
							],
						},
						{
							id: '53',
							name: 'Data Entry',
							path: '/components/data-entry',
							children: [],
							breadcrumbs: [
								{
									name: '元件',
									redirect: true,
									redirectPath: '/components/general',
								},
								{
									name: 'Data Entry',
								},
							],
						},
						{
							id: '54',
							name: 'Data Display',
							path: '/components/data-display',
							children: [],
							breadcrumbs: [
								{
									name: '元件',
									redirect: true,
									redirectPath: '/components/general',
								},
								{
									name: 'Data Display',
								},
							],
						},
						{
							id: '55',
							name: 'Feedback',
							path: '/components/feedback',
							children: [],
							breadcrumbs: [
								{
									name: '元件',
									redirect: true,
									redirectPath: '/components/general',
								},
								{
									name: 'Feedback',
								},
							],
						},
					],
				},
			],
		}
	},
})
