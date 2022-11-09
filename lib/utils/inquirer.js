const createInformation = [
  {
      type: 'input',
      name: 'createName',
      message: '请输入项目名称',
  },{
      type: "checkbox",
      name: "compList",
      message: "请选择你所需要的模块",
      choices: [
          { name: 'baseConfigComponents', value: 'baseConfigComponents' },
          { name: 'loginComponents', value: 'loginComponents' },
          { name: 'queryComponent', value: 'queryComponent' },
      ],
  },
]

module.exports = {
  createInformation,
}
