/* Inline SJCL */
// @ts-ignore
"use strict";var sjcl: any={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};function t(t,e,i){if(4!==e.length)throw new sjcl.exception.invalid("invalid aes block size");var c=t.b[i],s=e[0]^c[0],n=e[i?3:1]^c[1],r=e[2]^c[2];e=e[i?1:3]^c[3];var o,a,l,h,d=c.length/4-2,u=4,f=[0,0,0,0];t=(o=t.s[i])[0];var p=o[1],m=o[2],j=o[3],y=o[4];for(h=0;h<d;h++)o=t[s>>>24]^p[n>>16&255]^m[r>>8&255]^j[255&e]^c[u],a=t[n>>>24]^p[r>>16&255]^m[e>>8&255]^j[255&s]^c[u+1],l=t[r>>>24]^p[e>>16&255]^m[s>>8&255]^j[255&n]^c[u+2],e=t[e>>>24]^p[s>>16&255]^m[n>>8&255]^j[255&r]^c[u+3],u+=4,s=o,n=a,r=l;for(h=0;4>h;h++)f[i?3&-h:h]=y[s>>>24]<<24^y[n>>16&255]<<16^y[r>>8&255]<<8^y[255&e]^c[u++],o=s,s=n,n=r,r=e,e=o;return f}function u(t,e){var i,c,s,n=t.F,r=t.b,o=n[0],a=n[1],l=n[2],h=n[3],d=n[4],u=n[5],f=n[6],p=n[7];for(i=0;64>i;i++)16>i?c=e[i]:(c=e[i+1&15],s=e[i+14&15],c=e[15&i]=(c>>>7^c>>>18^c>>>3^c<<25^c<<14)+(s>>>17^s>>>19^s>>>10^s<<15^s<<13)+e[15&i]+e[i+9&15]|0),c=c+p+(d>>>6^d>>>11^d>>>25^d<<26^d<<21^d<<7)+(f^d&(u^f))+r[i],p=f,f=u,u=d,d=h+c|0,h=l,l=a,o=c+((a=o)&l^h&(a^l))+(a>>>2^a>>>13^a>>>22^a<<30^a<<19^a<<10)|0;n[0]=n[0]+o|0,n[1]=n[1]+a|0,n[2]=n[2]+l|0,n[3]=n[3]+h|0,n[4]=n[4]+d|0,n[5]=n[5]+u|0,n[6]=n[6]+f|0,n[7]=n[7]+p|0}function A(t,e){var i,c=sjcl.random.K[t],s=[];for(i in c)c.hasOwnProperty(i)&&s.push(c[i]);for(i=0;i<s.length;i++)s[i](e)}function C(t,e){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?t.addEntropy(window.performance.now(),e,"loadtime"):t.addEntropy((new Date).valueOf(),e,"loadtime")}function y(t){t.b=z(t).concat(z(t)),t.L=new sjcl.cipher.aes(t.b)}function z(t){for(var e=0;4>e&&(t.h[e]=t.h[e]+1|0,!t.h[e]);e++);return t.L.encrypt(t.h)}function B(t,e){return function(){e.apply(t,arguments)}}sjcl.cipher.aes=function(t){this.s[0][0][0]||this.O();var e,i,c,s,n=this.s[0][4],r=this.s[1],o=1;if(4!==(e=t.length)&&6!==e&&8!==e)throw new sjcl.exception.invalid("invalid aes key size");for(this.b=[c=t.slice(0),s=[]],t=e;t<4*e+28;t++)i=c[t-1],(0==t%e||8===e&&4==t%e)&&(i=n[i>>>24]<<24^n[i>>16&255]<<16^n[i>>8&255]<<8^n[255&i],0==t%e&&(i=i<<8^i>>>24^o<<24,o=o<<1^283*(o>>7))),c[t]=c[t-e]^i;for(e=0;t;e++,t--)i=c[3&e?t:t-4],s[e]=4>=t||4>e?i:r[0][n[i>>>24]]^r[1][n[i>>16&255]]^r[2][n[i>>8&255]]^r[3][n[255&i]]},sjcl.cipher.aes.prototype={encrypt:function(e){return t(this,e,0)},decrypt:function(e){return t(this,e,1)},s:[[[],[],[],[],[]],[[],[],[],[],[]]],O:function(){var t,e,i,c,s,n,r,o=this.s[0],a=this.s[1],l=o[4],h=a[4],d=[],u=[];for(t=0;256>t;t++)u[(d[t]=t<<1^283*(t>>7))^t]=t;for(e=i=0;!l[e];e^=c||1,i=u[i]||1)for(n=(n=i^i<<1^i<<2^i<<3^i<<4)>>8^255&n^99,l[e]=n,h[n]=e,r=16843009*(s=d[t=d[c=d[e]]])^65537*t^257*c^16843008*e,s=257*d[n]^16843008*n,t=0;4>t;t++)o[t][e]=s=s<<24^s>>>8,a[t][n]=r=r<<24^r>>>8;for(t=0;5>t;t++)o[t]=o[t].slice(0),a[t]=a[t].slice(0)}},sjcl.bitArray={bitSlice:function(t,e,i){return t=sjcl.bitArray.$(t.slice(e/32),32-(31&e)).slice(1),void 0===i?t:sjcl.bitArray.clamp(t,i-e)},extract:function(t,e,i){var c=Math.floor(-e-i&31);return(-32&(e+i-1^e)?t[e/32|0]<<32-c^t[e/32+1|0]>>>c:t[e/32|0]>>>c)&(1<<i)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e);var i=t[t.length-1],c=sjcl.bitArray.getPartial(i);return 32===c?t.concat(e):sjcl.bitArray.$(e,c,0|i,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length;return 0===e?0:32*(e-1)+sjcl.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t;var i=(t=t.slice(0,Math.ceil(e/32))).length;return e&=31,0<i&&e&&(t[i-1]=sjcl.bitArray.partial(e,t[i-1]&2147483648>>e-1,1)),t},partial:function(t,e,i){return 32===t?e:(i?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(sjcl.bitArray.bitLength(t)!==sjcl.bitArray.bitLength(e))return!1;var i,c=0;for(i=0;i<t.length;i++)c|=t[i]^e[i];return 0===c},$:function(t,e,i,c){var s;for(s=0,void 0===c&&(c=[]);32<=e;e-=32)c.push(i),i=0;if(0===e)return c.concat(t);for(s=0;s<t.length;s++)c.push(i|t[s]>>>e),i=t[s]<<32-e;return s=t.length?t[t.length-1]:0,t=sjcl.bitArray.getPartial(s),c.push(sjcl.bitArray.partial(e+t&31,32<e+t?i:c.pop(),1)),c},i:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,i;for(e=0;e<t.length;++e)i=t[e],t[e]=i>>>24|i>>>8&65280|(65280&i)<<8|i<<24;return t}},sjcl.codec.utf8String={fromBits:function(t){var e,i,c="",s=sjcl.bitArray.bitLength(t);for(e=0;e<s/8;e++)0==(3&e)&&(i=t[e/4]),c+=String.fromCharCode(i>>>8>>>8>>>8),i<<=8;return decodeURIComponent(escape(c))},toBits:function(t){t=unescape(encodeURIComponent(t));var e,i=[],c=0;for(e=0;e<t.length;e++)c=c<<8|t.charCodeAt(e),3==(3&e)&&(i.push(c),c=0);return 3&e&&i.push(sjcl.bitArray.partial(8*(3&e),c)),i}},sjcl.codec.hex={fromBits:function(t){var e,i="";for(e=0;e<t.length;e++)i+=(0xf00000000000+(0|t[e])).toString(16).substr(4);return i.substr(0,sjcl.bitArray.bitLength(t)/4)},toBits:function(t){var e,i,c=[];for(i=(t=t.replace(/\s|0x/g,"")).length,t+="00000000",e=0;e<t.length;e+=8)c.push(0^parseInt(t.substr(e,8),16));return sjcl.bitArray.clamp(c,4*i)}},sjcl.codec.base32={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",X:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(t,e,i){var c=sjcl.codec.base32.BASE,s=sjcl.codec.base32.REMAINING,n="",r=0,o=sjcl.codec.base32.B,a=0,l=sjcl.bitArray.bitLength(t);for(i&&(o=sjcl.codec.base32.X),i=0;n.length*c<l;)n+=o.charAt((a^t[i]>>>r)>>>s),r<c?(a=t[i]<<c-r,r+=s,i++):(a<<=c,r-=c);for(;7&n.length&&!e;)n+="=";return n},toBits:function(t,e){t=t.replace(/\s|=/g,"").toUpperCase();var i,c,s=sjcl.codec.base32.BITS,n=sjcl.codec.base32.BASE,r=sjcl.codec.base32.REMAINING,o=[],a=0,l=sjcl.codec.base32.B,h=0,d="base32";for(e&&(l=sjcl.codec.base32.X,d="base32hex"),i=0;i<t.length;i++){if(0>(c=l.indexOf(t.charAt(i)))){if(!e)try{return sjcl.codec.base32hex.toBits(t)}catch(t){}throw new sjcl.exception.invalid("this isn't "+d+"!")}a>r?(a-=r,o.push(h^c>>>a),h=c<<s-a):h^=c<<s-(a+=n)}return 56&a&&o.push(sjcl.bitArray.partial(56&a,h,1)),o}},sjcl.codec.base32hex={fromBits:function(t,e){return sjcl.codec.base32.fromBits(t,e,1)},toBits:function(t){return sjcl.codec.base32.toBits(t,1)}},sjcl.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,e,i){var c="",s=0,n=sjcl.codec.base64.B,r=0,o=sjcl.bitArray.bitLength(t);for(i&&(n=n.substr(0,62)+"-_"),i=0;6*c.length<o;)c+=n.charAt((r^t[i]>>>s)>>>26),6>s?(r=t[i]<<6-s,s+=26,i++):(r<<=6,s-=6);for(;3&c.length&&!e;)c+="=";return c},toBits:function(t,e){t=t.replace(/\s|=/g,"");var i,c,s=[],n=0,r=sjcl.codec.base64.B,o=0;for(e&&(r=r.substr(0,62)+"-_"),i=0;i<t.length;i++){if(0>(c=r.indexOf(t.charAt(i))))throw new sjcl.exception.invalid("this isn't base64!");26<n?(n-=26,s.push(o^c>>>n),o=c<<32-n):o^=c<<32-(n+=6)}return 56&n&&s.push(sjcl.bitArray.partial(56&n,o,1)),s}},sjcl.codec.base64url={fromBits:function(t){return sjcl.codec.base64.fromBits(t,1,1)},toBits:function(t){return sjcl.codec.base64.toBits(t,1)}},sjcl.hash.sha256=function(t){this.b[0]||this.O(),t?(this.F=t.F.slice(0),this.A=t.A.slice(0),this.l=t.l):this.reset()},sjcl.hash.sha256.hash=function(t){return(new sjcl.hash.sha256).update(t).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this.F=this.Y.slice(0),this.A=[],this.l=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t));var e,i=this.A=sjcl.bitArray.concat(this.A,t);if(e=this.l,9007199254740991<(t=this.l=e+sjcl.bitArray.bitLength(t)))throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!=typeof Uint32Array){var c=new Uint32Array(i),s=0;for(e=512+e-(512+e&511);e<=t;e+=512)u(this,c.subarray(16*s,16*(s+1))),s+=1;i.splice(0,16*s)}else for(e=512+e-(512+e&511);e<=t;e+=512)u(this,i.splice(0,16));return this},finalize:function(){var t,e=this.A,i=this.F;for(t=(e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)])).length+2;15&t;t++)e.push(0);for(e.push(Math.floor(this.l/4294967296)),e.push(0|this.l);e.length;)u(this,e.splice(0,16));return this.reset(),i},Y:[],b:[],O:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}for(var e,i,c=0,s=2;64>c;s++){for(i=!0,e=2;e*e<=s;e++)if(0==s%e){i=!1;break}i&&(8>c&&(this.Y[c]=t(Math.pow(s,.5))),this.b[c]=t(Math.pow(s,1/3)),c++)}}},sjcl.mode.ccm={name:"ccm",G:[],listenProgress:function(t){sjcl.mode.ccm.G.push(t)},unListenProgress:function(t){-1<(t=sjcl.mode.ccm.G.indexOf(t))&&sjcl.mode.ccm.G.splice(t,1)},fa:function(t){var e,i=sjcl.mode.ccm.G.slice();for(e=0;e<i.length;e+=1)i[e](t)},encrypt:function(t,e,i,c,s){var n,r=e.slice(0),o=sjcl.bitArray,a=o.bitLength(i)/8,l=o.bitLength(r)/8;if(s=s||64,c=c||[],7>a)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(n=2;4>n&&l>>>8*n;n++);return n<15-a&&(n=15-a),i=o.clamp(i,8*(15-n)),e=sjcl.mode.ccm.V(t,e,i,c,s,n),r=sjcl.mode.ccm.C(t,r,i,e,s,n),o.concat(r.data,r.tag)},decrypt:function(t,e,i,c,s){s=s||64,c=c||[];var n=sjcl.bitArray,r=n.bitLength(i)/8,o=n.bitLength(e),a=n.clamp(e,o-s),l=n.bitSlice(e,o-s);o=(o-s)/8;if(7>r)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(e=2;4>e&&o>>>8*e;e++);if(e<15-r&&(e=15-r),i=n.clamp(i,8*(15-e)),a=sjcl.mode.ccm.C(t,a,i,l,s,e),t=sjcl.mode.ccm.V(t,a.data,i,c,s,e),!n.equal(a.tag,t))throw new sjcl.exception.corrupt("ccm: tag doesn't match");return a.data},na:function(t,e,i,c,s,n){var r=[],o=sjcl.bitArray,a=o.i;if(c=[o.partial(8,(e.length?64:0)|c-2<<2|n-1)],(c=o.concat(c,i))[3]|=s,c=t.encrypt(c),e.length)for(65279>=(i=o.bitLength(e)/8)?r=[o.partial(16,i)]:4294967295>=i&&(r=o.concat([o.partial(16,65534)],[i])),r=o.concat(r,e),e=0;e<r.length;e+=4)c=t.encrypt(a(c,r.slice(e,e+4).concat([0,0,0])));return c},V:function(t,e,i,c,s,n){var r=sjcl.bitArray,o=r.i;if((s/=8)%2||4>s||16<s)throw new sjcl.exception.invalid("ccm: invalid tag length");if(4294967295<c.length||4294967295<e.length)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");for(i=sjcl.mode.ccm.na(t,c,i,s,r.bitLength(e)/8,n),c=0;c<e.length;c+=4)i=t.encrypt(o(i,e.slice(c,c+4).concat([0,0,0])));return r.clamp(i,8*s)},C:function(t,e,i,c,s,n){var r,o=sjcl.bitArray;r=o.i;var a=e.length,l=o.bitLength(e),h=a/50,d=h;if(i=o.concat([o.partial(8,n-1)],i).concat([0,0,0]).slice(0,4),c=o.bitSlice(r(c,t.encrypt(i)),0,s),!a)return{tag:c,data:[]};for(r=0;r<a;r+=4)r>h&&(sjcl.mode.ccm.fa(r/a),h+=d),i[3]++,s=t.encrypt(i),e[r]^=s[0],e[r+1]^=s[1],e[r+2]^=s[2],e[r+3]^=s[3];return{tag:c,data:o.clamp(e,l)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(t,e,i,c,s,n){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits");var r,o=sjcl.mode.ocb2.S,a=sjcl.bitArray,l=a.i,h=[0,0,0,0];i=o(t.encrypt(i));var d,u=[];for(c=c||[],s=s||64,r=0;r+4<e.length;r+=4)h=l(h,d=e.slice(r,r+4)),u=u.concat(l(i,t.encrypt(l(i,d)))),i=o(i);return d=e.slice(r),e=a.bitLength(d),r=t.encrypt(l(i,[0,0,0,e])),d=a.clamp(l(d.concat([0,0,0]),r),e),h=l(h,l(d.concat([0,0,0]),r)),h=t.encrypt(l(h,l(i,o(i)))),c.length&&(h=l(h,n?c:sjcl.mode.ocb2.pmac(t,c))),u.concat(a.concat(d,a.clamp(h,s)))},decrypt:function(t,e,i,c,s,n){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits");s=s||64;var r,o,a=sjcl.mode.ocb2.S,l=sjcl.bitArray,h=l.i,d=[0,0,0,0],u=a(t.encrypt(i)),f=sjcl.bitArray.bitLength(e)-s,p=[];for(c=c||[],i=0;i+4<f/32;i+=4)r=h(u,t.decrypt(h(u,e.slice(i,i+4)))),d=h(d,r),p=p.concat(r),u=a(u);if(o=f-32*i,r=t.encrypt(h(u,[0,0,0,o])),r=h(r,l.clamp(e.slice(i),o).concat([0,0,0])),d=h(d,r),d=t.encrypt(h(d,h(u,a(u)))),c.length&&(d=h(d,n?c:sjcl.mode.ocb2.pmac(t,c))),!l.equal(l.clamp(d,s),l.bitSlice(e,f)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return p.concat(l.clamp(r,o))},pmac:function(t,e){var i,c=sjcl.mode.ocb2.S,s=sjcl.bitArray,n=s.i,r=[0,0,0,0],o=n(o=t.encrypt([0,0,0,0]),c(c(o)));for(i=0;i+4<e.length;i+=4)o=c(o),r=n(r,t.encrypt(n(o,e.slice(i,i+4))));return i=e.slice(i),128>s.bitLength(i)&&(o=n(o,c(o)),i=s.concat(i,[-2147483648,0,0,0])),r=n(r,i),t.encrypt(n(c(n(o,c(o))),r))},S:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},sjcl.mode.gcm={name:"gcm",encrypt:function(t,e,i,c,s){var n=e.slice(0);return e=sjcl.bitArray,c=c||[],t=sjcl.mode.gcm.C(!0,t,n,c,i,s||128),e.concat(t.data,t.tag)},decrypt:function(t,e,i,c,s){var n=e.slice(0),r=sjcl.bitArray,o=r.bitLength(n);if(c=c||[],(s=s||128)<=o?(e=r.bitSlice(n,o-s),n=r.bitSlice(n,0,o-s)):(e=n,n=[]),t=sjcl.mode.gcm.C(!1,t,n,c,i,s),!r.equal(t.tag,e))throw new sjcl.exception.corrupt("gcm: tag doesn't match");return t.data},ka:function(t,e){var i,c,s,n,r,o=sjcl.bitArray.i;for(s=[0,0,0,0],n=e.slice(0),i=0;128>i;i++){for((c=0!=(t[Math.floor(i/32)]&1<<31-i%32))&&(s=o(s,n)),r=0!=(1&n[3]),c=3;0<c;c--)n[c]=n[c]>>>1|(1&n[c-1])<<31;n[0]>>>=1,r&&(n[0]^=-520093696)}return s},j:function(t,e,i){var c,s=i.length;for(e=e.slice(0),c=0;c<s;c+=4)e[0]^=4294967295&i[c],e[1]^=4294967295&i[c+1],e[2]^=4294967295&i[c+2],e[3]^=4294967295&i[c+3],e=sjcl.mode.gcm.ka(e,t);return e},C:function(t,e,i,c,s,n){var r,o,a,l,h,d,u,f,p=sjcl.bitArray;for(d=i.length,u=p.bitLength(i),f=p.bitLength(c),o=p.bitLength(s),r=e.encrypt([0,0,0,0]),96===o?(s=s.slice(0),s=p.concat(s,[1])):(s=sjcl.mode.gcm.j(r,[0,0,0,0],s),s=sjcl.mode.gcm.j(r,s,[0,0,Math.floor(o/4294967296),4294967295&o])),o=sjcl.mode.gcm.j(r,[0,0,0,0],c),h=s.slice(0),c=o.slice(0),t||(c=sjcl.mode.gcm.j(r,o,i)),l=0;l<d;l+=4)h[3]++,a=e.encrypt(h),i[l]^=a[0],i[l+1]^=a[1],i[l+2]^=a[2],i[l+3]^=a[3];return i=p.clamp(i,u),t&&(c=sjcl.mode.gcm.j(r,o,i)),t=[Math.floor(f/4294967296),4294967295&f,Math.floor(u/4294967296),4294967295&u],c=sjcl.mode.gcm.j(r,c,t),a=e.encrypt(s),c[0]^=a[0],c[1]^=a[1],c[2]^=a[2],c[3]^=a[3],{tag:p.bitSlice(c,0,n),data:i}}},sjcl.misc.hmac=function(t,e){this.W=e=e||sjcl.hash.sha256;var i,c=[[],[]],s=e.prototype.blockSize/32;for(this.w=[new e,new e],t.length>s&&(t=e.hash(t)),i=0;i<s;i++)c[0][i]=909522486^t[i],c[1][i]=1549556828^t[i];this.w[0].update(c[0]),this.w[1].update(c[1]),this.R=new e(this.w[0])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(t){if(this.aa)throw new sjcl.exception.invalid("encrypt on already updated hmac called!");return this.update(t),this.digest(t)},sjcl.misc.hmac.prototype.reset=function(){this.R=new this.W(this.w[0]),this.aa=!1},sjcl.misc.hmac.prototype.update=function(t){this.aa=!0,this.R.update(t)},sjcl.misc.hmac.prototype.digest=function(){var t=this.R.finalize();t=new this.W(this.w[1]).update(t).finalize();return this.reset(),t},sjcl.misc.pbkdf2=function(t,e,i,c,s){if(i=i||1e4,0>c||0>i)throw new sjcl.exception.invalid("invalid params to pbkdf2");"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),t=new(s=s||sjcl.misc.hmac)(t);var n,r,o,a,l=[],h=sjcl.bitArray;for(a=1;32*l.length<(c||1);a++){for(s=n=t.encrypt(h.concat(e,[a])),r=1;r<i;r++)for(n=t.encrypt(n),o=0;o<n.length;o++)s[o]^=n[o];l=l.concat(s)}return c&&(l=h.clamp(l,c)),l},sjcl.prng=function(t){this.c=[new sjcl.hash.sha256],this.m=[0],this.P=0,this.H={},this.N=0,this.U={},this.Z=this.f=this.o=this.ha=0,this.b=[0,0,0,0,0,0,0,0],this.h=[0,0,0,0],this.L=void 0,this.M=t,this.D=!1,this.K={progress:{},seeded:{}},this.u=this.ga=0,this.I=1,this.J=2,this.ca=65536,this.T=[0,48,64,96,128,192,256,384,512,768,1024],this.da=3e4,this.ba=80},sjcl.prng.prototype={randomWords:function(t,e){var i,c,s=[];if((i=this.isReady(e))===this.u)throw new sjcl.exception.notReady("generator isn't seeded");if(i&this.J){i=!(i&this.I),c=[];var n,r=0;for(this.Z=c[0]=(new Date).valueOf()+this.da,n=0;16>n;n++)c.push(4294967296*Math.random()|0);for(n=0;n<this.c.length&&(c=c.concat(this.c[n].finalize()),r+=this.m[n],this.m[n]=0,i||!(this.P&1<<n));n++);for(this.P>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.m.push(0)),this.f-=r,r>this.o&&(this.o=r),this.P++,this.b=sjcl.hash.sha256.hash(this.b.concat(c)),this.L=new sjcl.cipher.aes(this.b),i=0;4>i&&(this.h[i]=this.h[i]+1|0,!this.h[i]);i++);}for(i=0;i<t;i+=4)0==(i+1)%this.ca&&y(this),c=z(this),s.push(c[0],c[1],c[2],c[3]);return y(this),s.slice(0,t)},setDefaultParanoia:function(t,e){if(0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.M=t},addEntropy:function(t,e,i){i=i||"user";var c,s,n=(new Date).valueOf(),r=this.H[i],o=this.isReady(),a=0;switch(void 0===(c=this.U[i])&&(c=this.U[i]=this.ha++),void 0===r&&(r=this.H[i]=0),this.H[i]=(this.H[i]+1)%this.c.length,typeof t){case"number":void 0===e&&(e=1),this.c[r].update([c,this.N++,1,e,n,1,0|t]);break;case"object":if("[object Uint32Array]"===(i=Object.prototype.toString.call(t))){for(s=[],i=0;i<t.length;i++)s.push(t[i]);t=s}else for("[object Array]"!==i&&(a=1),i=0;i<t.length&&!a;i++)"number"!=typeof t[i]&&(a=1);if(!a){if(void 0===e)for(i=e=0;i<t.length;i++)for(s=t[i];0<s;)e++,s>>>=1;this.c[r].update([c,this.N++,2,e,n,t.length].concat(t))}break;case"string":void 0===e&&(e=t.length),this.c[r].update([c,this.N++,3,e,n,t.length]),this.c[r].update(t);break;default:a=1}if(a)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.m[r]+=e,this.f+=e,o===this.u&&(this.isReady()!==this.u&&A("seeded",Math.max(this.o,this.f)),A("progress",this.getProgress()))},isReady:function(t){return t=this.T[void 0!==t?t:this.M],this.o&&this.o>=t?this.m[0]>this.ba&&(new Date).valueOf()>this.Z?this.J|this.I:this.I:this.f>=t?this.J|this.u:this.u},getProgress:function(t){return t=this.T[t||this.M],this.o>=t?1:this.f>t?1:this.f/t},startCollectors:function(){if(!this.D){if(this.a={loadTimeCollector:B(this,this.ma),mouseCollector:B(this,this.oa),keyboardCollector:B(this,this.la),accelerometerCollector:B(this,this.ea),touchCollector:B(this,this.qa)},window.addEventListener)window.addEventListener("load",this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else{if(!document.attachEvent)throw new sjcl.exception.bug("can't attach event");document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)}this.D=!0}},stopCollectors:function(){this.D&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.D=!1)},addEventListener:function(t,e){this.K[t][this.ga++]=e},removeEventListener:function(t,e){var i,c,s=this.K[t],n=[];for(c in s)s.hasOwnProperty(c)&&s[c]===e&&n.push(c);for(i=0;i<n.length;i++)delete s[c=n[i]]},la:function(){C(this,1)},oa:function(t){var e,i;try{e=t.x||t.clientX||t.offsetX||0,i=t.y||t.clientY||t.offsetY||0}catch(t){i=e=0}0!=e&&0!=i&&this.addEntropy([e,i],2,"mouse"),C(this,0)},qa:function(t){t=t.touches[0]||t.changedTouches[0],this.addEntropy([t.pageX||t.clientX,t.pageY||t.clientY],1,"touch"),C(this,0)},ma:function(){C(this,2)},ea:function(t){if(t=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z,window.orientation){var e=window.orientation;"number"==typeof e&&this.addEntropy(e,1,"accelerometer")}t&&this.addEntropy(t,2,"accelerometer"),C(this,0)}},sjcl.random=new sjcl.prng(6);t:try{var D,E,F,G;if(G="undefined"!=typeof module&&module.exports){var H;try{H=require("crypto")}catch(t){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array(new Uint8Array(D).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(F=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break t;window.msCrypto.getRandomValues(F)}sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(t){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(t))}sjcl.json={defaults:{v:1,iter:1e4,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},ja:function(t,e,i,c){i=i||{},c=c||{};var s,n=sjcl.json,r=n.g({iv:sjcl.random.randomWords(4,0)},n.defaults);if(n.g(r,i),i=r.adata,"string"==typeof r.salt&&(r.salt=sjcl.codec.base64.toBits(r.salt)),"string"==typeof r.iv&&(r.iv=sjcl.codec.base64.toBits(r.iv)),!sjcl.mode[r.mode]||!sjcl.cipher[r.cipher]||"string"==typeof t&&100>=r.iter||64!==r.ts&&96!==r.ts&&128!==r.ts||128!==r.ks&&192!==r.ks&&256!==r.ks||2>r.iv.length||4<r.iv.length)throw new sjcl.exception.invalid("json encrypt: invalid parameters");return"string"==typeof t?(t=(s=sjcl.misc.cachedPbkdf2(t,r)).key.slice(0,r.ks/32),r.salt=s.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.publicKey&&(s=t.kem(),r.kemtag=s.tag,t=s.key.slice(0,r.ks/32)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof i&&(r.adata=i=sjcl.codec.utf8String.toBits(i)),s=new sjcl.cipher[r.cipher](t),n.g(c,r),c.key=t,r.ct="ccm"===r.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.encrypt(s,e,r.iv,i,r.ts):sjcl.mode[r.mode].encrypt(s,e,r.iv,i,r.ts),r},encrypt:function(t,e,i,c){var s=sjcl.json,n=s.ja.apply(s,arguments);return s.encode(n)},ia:function(t,e,i,c){i=i||{},c=c||{};var s,n,r=sjcl.json;if(s=(e=r.g(r.g(r.g({},r.defaults),e),i,!0)).adata,"string"==typeof e.salt&&(e.salt=sjcl.codec.base64.toBits(e.salt)),"string"==typeof e.iv&&(e.iv=sjcl.codec.base64.toBits(e.iv)),!sjcl.mode[e.mode]||!sjcl.cipher[e.cipher]||"string"==typeof t&&100>=e.iter||64!==e.ts&&96!==e.ts&&128!==e.ts||128!==e.ks&&192!==e.ks&&256!==e.ks||!e.iv||2>e.iv.length||4<e.iv.length)throw new sjcl.exception.invalid("json decrypt: invalid parameters");return"string"==typeof t?(t=(n=sjcl.misc.cachedPbkdf2(t,e)).key.slice(0,e.ks/32),e.salt=n.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.secretKey&&(t=t.unkem(sjcl.codec.base64.toBits(e.kemtag)).slice(0,e.ks/32)),"string"==typeof s&&(s=sjcl.codec.utf8String.toBits(s)),n=new sjcl.cipher[e.cipher](t),s="ccm"===e.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(n,e.ct,e.iv,e.tag,s,e.ts):sjcl.mode[e.mode].decrypt(n,e.ct,e.iv,s,e.ts),r.g(c,e),c.key=t,1===i.raw?s:sjcl.codec.utf8String.fromBits(s)},decrypt:function(t,e,i,c){var s=sjcl.json;return s.ia(t,s.decode(e),i,c)},encode:function(t){var e,i="{",c="";for(e in t)if(t.hasOwnProperty(e)){if(!e.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");switch(i+=c+'"'+e+'":',c=",",typeof t[e]){case"number":case"boolean":i+=t[e];break;case"string":i+='"'+escape(t[e])+'"';break;case"object":i+='"'+sjcl.codec.base64.fromBits(t[e],0)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type")}}return i+"}"},decode:function(t){if(!(t=t.replace(/\s/g,"")).match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");t=t.replace(/^\{|\}$/g,"").split(/,/);var e,i,c={};for(e=0;e<t.length;e++){if(!(i=t[e].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");null!=i[3]?c[i[2]]=parseInt(i[3],10):null!=i[4]?c[i[2]]=i[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64.toBits(i[4]):unescape(i[4]):null!=i[5]&&(c[i[2]]="true"===i[5])}return c},g:function(t,e,i){if(void 0===t&&(t={}),void 0===e)return t;for(var c in e)if(e.hasOwnProperty(c)){if(i&&void 0!==t[c]&&t[c]!==e[c])throw new sjcl.exception.invalid("required parameter overridden");t[c]=e[c]}return t},sa:function(t,e){var i,c={};for(i in t)t.hasOwnProperty(i)&&t[i]!==e[i]&&(c[i]=t[i]);return c},ra:function(t,e){var i,c={};for(i=0;i<e.length;i++)void 0!==t[e[i]]&&(c[e[i]]=t[e[i]]);return c}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.pa={},sjcl.misc.cachedPbkdf2=function(t,e){var i,c=sjcl.misc.pa;return i=(e=e||{}).iter||1e3,(i=(c=c[t]=c[t]||{})[i]=c[i]||{firstSalt:e.salt&&e.salt.length?e.salt.slice(0):sjcl.random.randomWords(2,0)})[c=void 0===e.salt?i.firstSalt:e.salt]=i[c]||sjcl.misc.pbkdf2(t,c,e.iter),{key:i[c].slice(0),salt:c.slice(0)}},"undefined"!=typeof module&&module.exports&&(module.exports=sjcl),"function"==typeof define&&define([],function(){return sjcl});
/* end inline sjcl */

import { Directory, DirectoryKeys } from "../Directory";
import Scout from "../contact/Scout";
import PhoneNumber from "../contact/PhoneNumber";
import $ from "jquery";
import List from "list.js";
import PageState from "../utils/PageState";
import Query from "../utils/Query";
import URL from "../utils/URL";
import HTML from "../utils/HTML";
import "bootstrap";
import "bootstrap-select";
import Database from "../server/Database";

let db = new Database();

PageState.init();

const directoryKeymap = [
    ["scout", "firstName"], ["scout", "lastName"], ["scout", "email"], ["scout", "homePhone"], ["scout", "slack"],
    ["scout", "jobA"], ["scout", "jobB"], ["scout", "school"], ["scout", "classOf"], ["scout", "joinDate"], ["scout", "active"], ["scout", "WFATrained"],
    ["scout", "cellPhone"],
    ["father", "firstName"], ["father", "lastName"], ["father", "cellPhone"], ["father", "email"], ["father", "slack"],
    ["mother", "firstName"], ["mother", "lastName"], ["mother", "cellPhone"], ["mother", "email"], ["mother", "slack"],
];
/**
 * First string in each element is the full name, the last (which can also be the first) string is the short version.
 */
const columnKeymap = [
    [["Scout\'s First Name"], ["Scout\'s Last Name"], ["Patrol"], ["Scout\'s E-mail"], ["Scout\'s Home Phone"], ["Slack Username"],
        ["Troop Jobs"], ["School"], ["Class Of (high school)", "Class Of"], ["Date Joined Troop 485", "Join Date"], ["Active (Y)es/ (R)arely/ (A)ged Out/ (N)o", "Active"], ["Wilderness First Aid Trained", "WFA Trained"],
        ["Scout\'s Cell Phone"]],
    [["Father\'s First Name"], ["Father\'s Last Name"], ["Father\'s Cell Phone"], ["Father\'s E-mail"], ["Father\'s Slack Username or None"]],
    [["Mother\'s First Name"], ["Mother\'s Last Name"], ["Mother\'s Cell Phone"], ["Mother\'s E-mail"], ["Mother\'s Slack Username or None"]],
];

const readablePatrolMap = {
    DRAGON: "Dragons",
    WILDCAT: "Wildcats",
    SERPENT: "Serpents",
    CACTI: "Cacti",
    BLOBFISH: "Blobfish",
    HAWK: "Hawks",
};
const defaultShown = [[0, 1, 2, 3, 4, 12], [], []];
const defaults = {
    search: "",
    filter: "1",
    sort: "asc",
    shown: ["0", "1", "2", "3", "4", "10"],
};

const encryptedKeys = {
    "iv": "Dypwq2X0gX+u9C11ZQVIZQ==",
    "v": 1,
    "iter": 10000,
    "ks": 128,
    "ts": 64,
    "mode": "ccm",
    "adata": "",
    "cipher": "aes",
    "salt": "1qkK4eo5/cs=",
    "ct": "GVzIkPY8cK4LD3Ig0jQhPzVEJLQmHOZsBTa3jcmK5NguuiJojB4KGuQ9ydyyuHG9QRLmIcDcYVmvUIpHFkGm3ZHD/TcqVkX+68PaASb8+It//Tb+9fDH8NJ+QzPn7+9o389QNjfgk4GDbFkvSIxzPfTi+VUA38jE8EAknC8+oOjvPqHRSB/CnhJWqYmgCaQw/nqTSZ0TrHdVP0mA7WTo0+ueP8oyC8BL9NdWMrgU6XwO1ymfqJ4axKrsLB+KjNtGYuWcZuZLUe/RGQav1sR5ohGFCn2HifGl8CY6lTRu71yC41a7c0zV6hYTN/C/9+gozk/UWA0NQPrrxWOsocJs2C2LAl+yDJfu9VLLFPqunhV3bl/MzJOEpQMfkc6677RCx9t7E+ccYOdGNC2rtObMTJ0rpb9oInFmjc+idYcAsU3vy0Xc5JDf57XLiR6fdh3mwOSYzBqSx97u+FmBC3q7xVaRmxDW7TG5FcrR5LhHoZDkTmOzk45NBRqbXqcbkThMX3iDAFsOtWCDoW4BTJT94afs/KqfGCqinay+4HsSmJ+XiK65G7rRw9wv/bPkGYhS",
};

const unknownText = `<i>Unknown</i>`;
const noneText = `<i>N/A</i>`;

let start = new Date().getTime();
let list;

$("#loading").addClass("hidden");
$("#auth").removeClass("hidden");
$("#password").focus();
$(document).keypress(function(e) {
    if (e.which === 13) {
        $("#pw-submit").click();
    }
});
$("#pw-submit").click(function() {
    let password = $("#password").val() + "";
    try {
        sjcl.decrypt(password, JSON.stringify(encryptedKeys));

    } catch{
        $("#password").val("");
        $("#password").addClass("is-invalid");
        return;
    }
    $("#password").val("");
    $("#auth").addClass("hidden");
    $("#loading").removeClass("hidden");
    init(password);

})

function init(password: string) {
    $("#loading").addClass("hidden");
    $("#directory").removeClass("hidden");
    loadHeaders();
    loadData(password, function(list: List) {
        loadFilterSelects(list);
    });


}


function loadHeaders() {
    let colNum = 0;

    for (let i = 0; i < columnKeymap.length; i++) {
        for (let j = 0; j < columnKeymap[i].length; j++, colNum++) {
            $("#dir-head-inner").append(`
				<th scope="col" class="col-${colNum} header">${columnKeymap[i][j][columnKeymap[i][j].length - 1]}</th>
			`);
        }
    }
}

function toString(obj: any, italciseUnknown: boolean = true) {
    // Alternative to if/else
    switch (true) {
            // We treat "" as undefined
        case obj === "":
        case typeof obj === "undefined":

            return italciseUnknown ? unknownText : "Unknown";
            break;
        case obj === null:
            return italciseUnknown ? noneText : "None";
            break;
        case typeof obj === "string":
            return obj;
            break;
        case typeof obj === "number":
        case obj instanceof PhoneNumber: // Explicitly type it out for clarity and in the method changes.
            return obj.toString();
            break;
        default:
            try {
                return obj.toString();
            } catch (e) {
                return unknownText;
            }
    }
}

/**
 * Queries the slack API and a cache in firebase about the Member Id for a given slack username.
 * @param username - The username of the user to query.
 * @param slackToken - An API Key for slack.
 * @returns A promise containing the ID.
 */
function getSlackID(username: string, slackToken: string) {
    return new Promise(function(resolve, reject) {
        db.ref("/directory/slackUID/").once("value").then(function(snapshot) {
            let data = snapshot.val();
            //Also encodes period
            let encodedUsername = encodeURIComponent(username).replace(/\./g, "%2E");
            console.log(encodedUsername, data);
            if (data != null && data[encodedUsername] != null && data[encodedUsername] != undefined) {
                resolve(data[encodedUsername]);
                return;
            } else {
                $.ajax({
                    url: `https://slack.com/api/users.list?token=${slackToken}`,
                    method: "GET",
                    dataType: "json",
                }).done(function(userlistdata) {
                    let userlist = userlistdata.members;
                    let updates = {};
                    let displayName: string;
                    for (let i = 0; i < userlist.length; i++) {
                        if (userlist[i].deleted) {
                            continue;
                        }
                        if (userlist[i].profile.display_name != "" && userlist[i].profile.display_name != undefined) {
                            displayName = userlist[i].profile.display_name;
                        } else {
                            displayName = userlist[i].profile.real_name;
                        }

                        updates[encodeURIComponent(displayName).replace(/\./g, "%2E")] = userlist[i].id;
                        if (displayName == username) {
                            resolve(userlist[i].id);
                        }
                    }
                    db.ref("/directory/slackUID/").update(updates);
                }).fail(function(err) {
                    console.log(err);
                    reject("AJAX Error");
                });
            }
        }).catch(function(err) {
            reject("Firebase Error");
        });
    });
}

function loadData(password: string, callback: (list: List) => void) {


    let data = JSON.parse(atob(sjcl.decrypt(password, JSON.stringify(encryptedKeys))));
    console.log(data);
    let editId = data.editId;
    let keys: DirectoryKeys;
    let slackKey = data.slackToken;

    keys = {
        id: data.id,
        api: data.api,
        sheets: data.sheets,
        range: "A2:X",

    };
    let load = (cache) => {
        $(".link-google-sheet-dir").attr("href", `https://docs.google.com/spreadsheets/d/${editId}/edit`);

        let directory = new Directory(keys, directoryKeymap, cache);
        directory.update(function(scout: Scout, id: number) {
            let row = [];
            for (let i = 0; i < directoryKeymap.length; i++) {
                let index = i;
                let value = "";
                if (i > 2) {
                    // We add the patrol, but it's not in the keymap
                    index--;
                }
                if (i > 6) {
                    // In the slot that would contain jobA, we list both jobs, so we skip the jobB.
                    index++;
                }
                if (i == 2) {

                    value = ["Dragons", "Serpents", "Blobfish", "Hawks", "Wildcats", "Cacti"]
                            [["DRAGON", "SERPENT", "BLOBFISH", "HAWK", "WILDCAT", "CACTI"].indexOf(scout.patrol)];
                } else if (directoryKeymap[index][1] === "jobA") {
                    if (!(scout.jobs) || scout.jobs[0] == "") {
                        value = unknownText;
                    } else if (scout.jobs[0] == "N/A") {
                        value = "N/A";
                    } else if (scout.jobs.length > 1 && (scout.jobs[1] == "N/A" || scout.jobs[1] == "")) {
                        value = scout.jobs[0];
                    } else {
                        value = scout["jobs"].join(", ");
                    }
                } else if (directoryKeymap[index][0] == "scout") {
                    value = toString(scout[directoryKeymap[index][1]]);
                } else {
                    // If the property is of the scout, and not the parents, or the property is of a non-null parent
                    // of the scout, then we convert it to a string.
                    value = (directoryKeymap[index][0] == "scout" || scout[directoryKeymap[index][0]])
                            ? toString(directoryKeymap[index][0] == "scout"
                                    ? scout[directoryKeymap[index][1]]
                                    : scout[directoryKeymap[index][0]][directoryKeymap[index][1]])
                            : unknownText;
                }

                row.push(`<td class="col-${i} nowrap">${value}</td>`);

            }


            $("#dir-body").append(`<tr data-id="${id}">${row.join("")}</tr>`);
        }).then(function(data) {
            $("#loading-text").addClass("hidden");
            let valueNames = [];
            let count = 0;
            for (let i = 0; i < columnKeymap.length; i++) {
                for (let j = 0; j < columnKeymap[i].length; j++, count++) {
                    valueNames.push("col-" + count);
                }

            }
            const options = {
                valueNames: valueNames,
            };

            let list = new List("directory-list", options);


            let end = new Date().getTime();
            $(".directoryScoutSize").text(directory.getScouts().length + "");
            $(".directoryLoadTime").text((end - start) + "ms");
            $(".directoryLoaded-show").removeClass("hidden");

            //localStorage.setItem("directoryCache", btoa(encodeURIComponent(JSON.stringify(data))));

            $(".list tr").click(function() {
                console.log(1)
                let id = $(this).attr("data-id");
                let scout = directory.getScouts()[id];
                let val: string;
                for (let i = 0; i < directoryKeymap.length; i++) {
                    if (directoryKeymap[i][0] === "scout") {
                        val = HTML.escape(toString(scout[directoryKeymap[i][1]], false));
                        if (scout[directoryKeymap[i][1]] == null) {
                            val = "<i>N/A</i>";
                        }

                    } else if (scout[directoryKeymap[i][0]] == null || scout[directoryKeymap[i][0]][directoryKeymap[i][1]] == null) {
                        val = "<i>N/A</i>";
                    } else {

                        val = HTML.escape(toString(scout[directoryKeymap[i][0]][directoryKeymap[i][1]], false));
                    }
                    if (directoryKeymap[i][1] === "email") {
                        val = `<a href="mailto:${val}" target="_blank">${val}</a>`;

                    } else if (directoryKeymap[i][1] === "cellPhone" || directoryKeymap[i][1] === "homePhone") {
                        val = `<a href="tel:${val}" target="_blank">${val}</a>`;

                    } else if (directoryKeymap[i][1] === "active" || directoryKeymap[i][1] === "WFATrained") {
                        switch (val) {
                            case "Y":
                                val = "Yes";
                                break;
                            case "N":
                                val = "No";
                                break;
                            case "A":
                                val = "Aged Out";
                                // This option is only applicable to active, so if we're processing
                                // a different field then it will be overwritten during the default case.
                                if (directoryKeymap[i][1] === "active")
                                    break;
                            case "R":
                                val = "Rarely";
                                // See above
                                if (directoryKeymap[i][1] === "active")
                                    break;
                            default:
                                val = "<i>Unknown</i>";
                        }
                    } else if (directoryKeymap[i][1] === "slack") {

                        if (val !== "<i>N/A</i>" && val !== "None") {
                            let username = val;
                            val = `
                                <a class="infoModal-${directoryKeymap[i][0] + directoryKeymap[i][1].charAt(0).toUpperCase()
                            + directoryKeymap[i][1].substring(1)}Link" target="_blank">${val}</a>
                                `;
                            let selector = `.infoModal-${directoryKeymap[i][0] + directoryKeymap[i][1].charAt(0).toUpperCase()
                            + directoryKeymap[i][1].substring(1)}Link`;
                            getSlackID(username, slackKey).then(function(id) {
                                $(selector).attr("href", "https://t485.slack.com/messages/message/team/" + id);

                            });
                        } else {
                            val = "<i>None</i>";
                        }
                    }
                    $(".infoModal-" + directoryKeymap[i][0] + directoryKeymap[i][1].charAt(0).toUpperCase()
                            + directoryKeymap[i][1].substring(1)).html(val);

                }
                console.log(2)
                $(".infoModal-scoutPatrol").text(readablePatrolMap[scout.patrol]);

                $(".infoModal-scoutJobs").text((!!scout.jobs || scout.jobs.length < 1) ? scout.jobs.join(", ") : "<i>None</i>");
                $(".infoModal-scoutFullName").text(scout.firstName + " " + scout.lastName);
                $(".infoModal-mother").addClass("hidden");
                $(".infoModal-father").addClass("hidden");
                if (scout.mother) {
                    $(".infoModal-motherFullName").text(scout.mother.firstName + " " + scout.mother.lastName);
                    $(".infoModal-motherDownload").click(function() {
                        download(scout.mother.firstName + scout.mother.lastName + ".vcf", scout.mother.export());
                    });
                    $(".infoModal-mother").removeClass("hidden");
                }
                if (scout.father) {
                    $(".infoModal-fatherFullName").text(scout.father.firstName + " " + scout.father.lastName);
                    $(".infoModal-fatherDownload").click(function() {
                        download(scout.father.firstName + scout.father.lastName + ".vcf", scout.father.export());
                    });
                    $(".infoModal-father").removeClass("hidden");
                }
                $(".infoModal-scoutDownload").click(function() {
                    download(scout.firstName + scout.lastName + ".vcf", scout.export());
                });
                $(".infoModal-editLink").attr("href", `https://docs.google.com/spreadsheets/d/${editId}/edit`);
                console.log(3)

                $("#infoModal").modal("show");

                window.location.hash = id;
            });
            $("#infoModal").on("hide.bs.modal", function() {
                window.location.hash = "#";
            });
            callback(list);

        });
    };


    //let cache = localStorage.getItem("directoryCache");
    //if (cache != null) {
    //    cache = JSON.parse(decodeURIComponent(atob(cache)));
    //    load(cache);
    //} else {
        load(null);
    //}

}


function loadFilterSelects(list: List) {


    let index = 0;
    for (let i = 0; i < columnKeymap.length; i++) {
        let sortOpts = "";
        let filterOpts = "";

        for (let j = 0; j < columnKeymap[i].length; j++) {
            sortOpts += `<option value="${index}">${columnKeymap[i][j][columnKeymap[i][j].length - 1]}</option>`;
            filterOpts += `<option value="${index}" ${defaultShown[i].indexOf(j) > -1 ? "selected" : ""}>${columnKeymap[i][j][columnKeymap[i][j].length - 1]}</option>`;
            index++;
        }

        $("#sortby-select").append(`<optgroup label="${["Scout", "Father", "Mother"][i]}">
            ${sortOpts}
        </optgroup>`);

        $("#filter-select").append(`<optgroup label="${["Scout", "Father", "Mother"][i]}">
            ${filterOpts}
        </optgroup>`);


    }
    $(".select-loading").remove();
    $("#filter-select, #sortby-select, #sortorder-select").removeAttr("disabled");
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $("#filter-select, #sortby-select, #sortorder-select").selectpicker("mobile");
    }
    $("#filter-select, #sortby-select, #sortorder-select").selectpicker("refresh");

    let checkDefaults = function() {

        if (
                $("#sortby-select").val() === defaults.filter &&
                $("#sortorder-select").val() === defaults.sort &&
                $("#filter-select").val() + "" === defaults.shown.join(",") &&
                $("#search").val() === defaults.search
        ) {
            URL.setQueryString("");
            $("#modified-settings").addClass("hidden");
        } else {
            $("#modified-settings").removeClass("hidden");
        }
    };

    $("#sortby-select, #sortorder-select").change(function() {
        URL.setQueryString(Query.set("sortBy", "" + $("#sortby-select").val(), Query.set("sortOrder", "" + $("#sortorder-select").val())));

        list.sort("col-" + $("#sortby-select").val(), { order: $("#sortorder-select").val() + "" });

        checkDefaults();
    });
    $("#filter-select").change(function() {
        // @ts-ignore -- #filter-select will always be an array
        let selected: string[] = $("#filter-select").val();
        let selectedIndex = 0;
        for (let i = 0; i < directoryKeymap.length; i++) {
            if (selected[selectedIndex] === (i + "")) {
                selectedIndex++;
                $(".col-" + i).removeClass("hidden");
            } else {
                $(".col-" + i).addClass("hidden");
            }

        }
        URL.setQueryString(Query.set("filterBy", JSON.stringify(selected.map(x => parseInt(x, 10))).slice(1, -1).replace(/,/g, "_")));

        checkDefaults();
    });

    $("#search").keyup(function() {
        URL.setQueryString(Query.set("search", $("#search").val() + ""));

        checkDefaults();
    });

    //initialize options
    list.sort("col-" + (Query.get("sortBy") || 1), { order: (Query.get("sortOrder") || "asc") + "" });
    $("#sortby-select").val(Query.get("sortBy") || 1).selectpicker("refresh");
    $("#sortorder-select").val(Query.get("sortOrder") || "asc").selectpicker("refresh");

    $("#search").val(Query.get("search"));
    list.fuzzySearch(Query.get("search"));
    let selected: string[] = Query.get("filterBy") ? Query.get("filterBy").split("_") : defaults.shown;
    let selectedIndex = 0;
    $("#filter-select").val(selected);
    $("#filter-select").selectpicker("refresh");
    for (let i = 0; i < directoryKeymap.length; i++) {
        if (selected[selectedIndex] === (i + "")) {
            selectedIndex++;
            $(".col-" + i).removeClass("hidden");
        } else {
            $(".col-" + i).addClass("hidden");
        }

    }

    if (window.location.hash.substring(1) != "") {
        $(`.list tr[data-id="${window.location.hash.substring(1)}"]`).click();
    }


}

function download(filename: string, text: any) {
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
