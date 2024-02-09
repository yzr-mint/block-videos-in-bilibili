// ==UserScript==
// @name         第一个油猴脚本
// @namespace    http://bilibili.com
// @version      0.1
// @description  用来屏蔽含指定标签的视频
// @author       Yzr
// @run-at       document-end
// @match        https://www.bilibili.com/video/*
// ==/UserScript==

let originalSrc;
let videoElement;

(function () {
	'use strict';

	const block_tags = [
		"原神",
		"米哈游",
		"帕鲁",
	];

	// 阻止播放
	function blockVideo() {
		while (!videoElement) videoElement = document.querySelector('.bpx-player-video-wrap video');
		videoElement.pause();
		// 存储原始的 src 属性值
		originalSrc = videoElement.getAttribute('src');
		videoElement.removeAttribute('src');
		videoElement.load();
		// alert("success!");
		return;
	}

	function restartVideo() {
		// alert("not found!");
		videoElement.setAttribute('src', originalSrc);
		videoElement.load();
		videoElement.play();
	}

	function test() {
		let all_tags = document.querySelectorAll('.tag-link');
		for (let i = 0; i < all_tags.length; i++) {
			let tag_text = all_tags[i].textContent;
			if (block_tags.some(blockTag => tag_text.includes(blockTag))) {
				// alert("find!");
				return tag_text;
			}
		}
		return "";
	}

	function notice(found_tag) {
		alert(`包含tag: ${found_tag}`);
		videoElement.parentNode.removeChild(videoElement);
	}

	function handleLoad() {
		'use strict';
		// alert("something happened");
		blockVideo();
		let tag = test();
		if (tag) {
			notice(tag);
		} else {
			restartVideo();
		}
	}

	(function () {
		handleLoad();
		// 使用MutationObserver监听<head>中<title>元素的变化
		const titleElement = document.querySelector('head title[data-vue-meta="true"]');
		const titleObserver = new MutationObserver(handleLoad);
		if (titleElement) {
			titleObserver.observe(titleElement, { childList: true, attributes: true });
		}
	})();
})();