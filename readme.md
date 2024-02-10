# 写在前面
- 第一次写JS。欢迎提出任何建议
- 仅在Edge上测试。可能有性能或可用性问题。
- 网页端的更新可能使此项目行为出现异常。
# 篡改猴插件 用于bilibili
- 屏蔽不想看到的视频和直播间礼物条等
## by-tag.js
- 在运行视频前检测tag中是否包含指定的关键词。
	- 如“原神”会屏蔽“原神UP激励计划”等
## by-name.js
- 在主页，搜索页，视频播放页根据视频名字来屏蔽视频。
## live.js
- 在直播界面里屏蔽礼物条等
## 修改屏蔽词库
- 修改源码中的这个数组
```js
const block_tags = [
	"原神",
	"米哈游",
	"帕鲁",
	"桀",
];
```
