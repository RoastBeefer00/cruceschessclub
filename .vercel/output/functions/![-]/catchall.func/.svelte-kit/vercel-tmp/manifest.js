export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["affiliate/Cruses_Chess_Club.png","affiliate/Digital Leaderboard Ad.png","affiliate/Digital Skyscraper Ad.png","arrow-left-solid.svg","arrow-right-solid.svg","ccc.png","checkerboard_3.jpg","chess-solid.svg","club_pics/image0(1).jpeg","club_pics/image0(2).jpeg","club_pics/image0(3).jpeg","club_pics/image0.jpeg","club_pics/image1(1).jpeg","club_pics/image1(2).jpeg","club_pics/image1(3).jpeg","club_pics/image1.jpeg","club_pics/image10(1).jpeg","club_pics/image10.jpeg","club_pics/image2(1).jpeg","club_pics/image2(2).jpeg","club_pics/image2.jpeg","club_pics/image3(1).jpeg","club_pics/image3(2).jpeg","club_pics/image3(3).jpeg","club_pics/image3.jpeg","club_pics/image3_1.jpeg","club_pics/image4(1).jpeg","club_pics/image4(2).jpeg","club_pics/image4(3).jpeg","club_pics/image4.jpeg","club_pics/image5(1).jpeg","club_pics/image5(2).jpeg","club_pics/image5(3).jpeg","club_pics/image5.jpeg","club_pics/image5_1.jpeg","club_pics/image6(1).jpeg","club_pics/image6(2).jpeg","club_pics/image6(3).jpeg","club_pics/image6.jpeg","club_pics/image7(1).jpeg","club_pics/image7(2).jpeg","club_pics/image7(3).jpeg","club_pics/image7.jpeg","club_pics/image8(1).jpeg","club_pics/image8(2).jpeg","club_pics/image8(3).jpeg","club_pics/image8.jpeg","club_pics/image9(1).jpeg","club_pics/image9.jpeg","favicon.png","jake_bio.jpeg","jake_jasmin.jpg","jesse_vick.png","ron_f.jpeg","travis_dent.png","will.jpg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.CxuJnMRx.js",app:"_app/immutable/entry/app.CpGs0puT.js",imports:["_app/immutable/entry/start.CxuJnMRx.js","_app/immutable/chunks/BZcyoQ8W.js","_app/immutable/chunks/bRGXjB5n.js","_app/immutable/chunks/SMdaaX-E.js","_app/immutable/entry/app.CpGs0puT.js","_app/immutable/chunks/Dkc8FkF2.js","_app/immutable/chunks/bRGXjB5n.js","_app/immutable/chunks/Cea7OwTu.js","_app/immutable/chunks/SMdaaX-E.js","_app/immutable/chunks/Cpa7pLOn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/calendar",
				pattern: /^\/api\/calendar\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/calendar/_server.js'))
			},
			{
				id: "/donate",
				pattern: /^\/donate\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/gallery",
				pattern: /^\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/lessons",
				pattern: /^\/lessons\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/schedule",
				pattern: /^\/schedule\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/support",
				pattern: /^\/support\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/tournaments",
				pattern: /^\/tournaments\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
