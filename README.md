<!--要写保存才能预览功能,需要保存时发送请求到后台生成页面(地址前后端都知道).然后点击预览查看指定页面即可-->

<!--给组件绑定js,需要根据组件的id去给script标签加入标识,这样方便修改和删除-->

developing...

~~[github preview上有bug,还是需要直接下载dist目录查看](https://htmlpreview.github.io/?https://github.com/choizhang/drag/blob/master/dist/index.html)~~

~~[GitZip](http://kinolien.github.io/gitzip/)
输入"https://github.com/choizhang/drag/tree/master/dist"进行下载~~

我放到了[github pages](https://choizhang.github.io/)上面


如果你感兴趣,下面的代码即可进入开发模式

1. bower install
2. npm installg
3. gulp serve

如果需要放入生产环境(编译到dist目录)
gulp build


组件类型
text 文本  textarea 文本域  checkbox 复选 radio 单选 select 选人  date 日期  datetime 日期时间 flowdealoption 流程意见 lable 标签 handwrite 签章  barcode 二维码   linenumber 行序号  relationform 关联表单  relation 数据关联  project 关联项目  member 人员  multimember 多人 account 单位  multiaccount 多单位  department 部门   multidepartment  多部门   post 岗位  multipost 多岗位  level 职务  multilevel 多职务  attachment 附件  image 图片  document 文档  outwrite 外部写入   externalwrite-ahead 外部预写  exchangetask dee任务   querytask dee查询任务   mapmarked 地图标注  maplocate 位置定位   mapphoto 拍照定位  customcontrol 自定义控件

在html中用sui-type="text"来做区别


<!--bower install-->

<!--npm install-->

<!--gulp serve-->


License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) choizhang
