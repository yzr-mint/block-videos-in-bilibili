// ==UserScript==
// @name         按标题屏蔽视频
// @namespace    http://bilibili.com
// @version      0.1
// @description  用来屏蔽标题含指定关键词的视频
// @author       Yzr
// @run-at       document-idle
// @match        https://www.bilibili.com/*
// @match        https://www.bilibili.com
// @match        https://search.bilibili.com/*
// ==/UserScript==

let originalSrc;
let videoElement;

(function () {
	'use strict';
	// 获取包含跳转链接的父元素
	const block_tags = [
		"原神",
		"米哈游",
		"帕鲁",
		"桀",
	];
	let titlePlace;
	let cardPlace;
	let observePlace;

	function removeHerf(target) {
		// alert("discovered");
		// 阻止播放
		target.querySelectorAll('[href]').forEach(element => {
			element.removeAttribute('href');
			element.style.pointerEvents = 'none';
		});
		// 阻止图片加载
		target.querySelectorAll("img").forEach(imgElement => {
			imgElement.remove();
		});
		return;
	}

	function handleCard(card) {
		// alert("go");
		let title = card.querySelector(titlePlace).textContent;
		if (title && block_tags.some(blockTag => title.includes(blockTag))) {
			removeHerf(card);
		}
		return;
	}

	function handleMainPage() {
		// alert("begin");
		let targetNode = document.querySelector(observePlace);
		const config = { attributes: true, childList: true, subtree: true };

		// 回调函数将在每次目标节点发生变化时被调用
		const callback = function (mutationsList, observer) {
			// alert("!");
			for (const mutation of mutationsList) {
				if (mutation.type === 'attributes' || mutation.type === 'childList') {
					const Cards = targetNode.querySelectorAll(cardPlace);
					Cards.forEach(Card => {
						handleCard(Card);
					});
				}
			}
		};

		const observer = new MutationObserver(callback);
		observer.observe(targetNode, config);

		// 在页面加载时，处理已经存在的元素
		document.querySelectorAll(cardPlace).forEach(card => {
			handleCard(card);
		});
	}

	// 检测是在哪个页面
	function whereAmI() {
		// get URL
		const currentUrl = window.location.href;
		// video
		if (/^https:\/\/www\.bilibili\.com\/video\/.+$/.test(currentUrl)) {
			// alert("video");
			titlePlace = '.title';
			cardPlace = '.card-box';
			observePlace = "head title";
			return;
		}
		// search
		else if (/^https:\/\/search\.bilibili\.com\/.+$/.test(currentUrl)) {
			// alert("search");
			titlePlace = '.bili-video-card__info--tit';
			cardPlace = '.bili-video-card';
			observePlace = ".search-page-wrapper";
			return;
		}
		// main
		else {
			// alert("main");
			titlePlace = '.bili-video-card__info--tit';
			cardPlace = '.feed-card';
			observePlace = ".container";
			return;
		}
	}

	(function () {
		whereAmI();
		handleMainPage();
		return;
	})();
})();
