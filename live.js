// ==UserScript==
// @name         清理B站直播间
// @namespace    http://bilibili.com
// @version      0.1
// @description  清除标题栏，全局礼物特效和礼物条。可以真正全屏看直播了
// @author       Yzr
// @run-at       document-idle
// @match        https://live.bilibili.com/*
// ==/UserScript==

(function () {
	'use strict';
	document.querySelector(".web-player-inject-wrap").remove();
	let rightElements = document.querySelectorAll(".right-ctnr");
	rightElements[1].remove();
	document.getElementById("gift-control-vm").remove();
	document.getElementById("gift-control-vm-new").remove();
})();
