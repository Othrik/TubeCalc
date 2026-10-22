// TubeCalc 共享分子量解析器：window.mwParse(化学式) → { mw, counts }，非法时抛出中文原因。
// 与分子量页面同一套规则：支持括号、水合物（CuSO4·5H2O / . / *）。
// 严格校验：下标/倍数必须 ≥1 的整数（拒绝 0 与前导零）、括号不得为空、元素符号须在周期表内、片段不得为空。
(function () {
  'use strict';
  const MASS = {H:1.008,He:4.0026,Li:6.94,Be:9.0122,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998,
  Ne:20.180,Na:22.990,Mg:24.305,Al:26.982,Si:28.085,P:30.974,S:32.06,Cl:35.45,Ar:39.948,
  K:39.098,Ca:40.078,Sc:44.956,Ti:47.867,V:50.942,Cr:51.996,Mn:54.938,Fe:55.845,Co:58.933,
  Ni:58.693,Cu:63.546,Zn:65.38,Ga:69.723,Ge:72.630,As:74.922,Se:78.971,Br:79.904,Kr:83.798,
  Rb:85.468,Sr:87.62,Y:88.906,Zr:91.224,Nb:92.906,Mo:95.95,Tc:98,Ru:101.07,Rh:102.91,
  Pd:106.42,Ag:107.87,Cd:112.41,In:114.82,Sn:118.71,Sb:121.76,Te:127.60,I:126.90,Xe:131.29,
  Cs:132.91,Ba:137.33,La:138.91,Ce:140.12,Pr:140.91,Nd:144.24,Pm:145,Sm:150.36,Eu:151.96,
  Gd:157.25,Tb:158.93,Dy:162.50,Ho:164.93,Er:167.26,Tm:168.93,Yb:173.05,Lu:174.97,Hf:178.49,
  Ta:180.95,W:183.84,Re:186.21,Os:190.23,Ir:192.22,Pt:195.08,Au:196.97,Hg:200.59,Tl:204.38,
  Pb:207.2,Bi:208.98,Po:209,At:210,Rn:222,Fr:223,Ra:226,Ac:227,Th:232.04,Pa:231.04,U:238.03,
  Np:237,Pu:244};
  // 下标/倍数：拒绝 0 与前导零（"H0"、"H01"、"(Na)0Cl"、"0H2O" 均非法）
  function subNum(s, what) {
    if (s.length > 1 && s[0] === '0') throw what + '不能有前导零：' + s;
    const n = parseInt(s, 10);
    if (!(n >= 1)) throw what + '不能为 0';
    return n;
  }
  function parseSegment(seg) {
    // 空白仅允许出现在水合物分隔符两侧（由 mwParse 统一归一化）；片段内部空白视为非法字符
    let i = 0, mult = 1;
    const m = seg.match(/^(\d+)/);
    if (m) { mult = subNum(m[1], '前导倍数'); i = m[1].length; }
    const counts = {};
    const stack = [counts];   // 栈语义：pop/peek 用 stack.length 判断，不用外部计数器（连续括号组才不会串写残留对象）
    while (i < seg.length) {
      const ch = seg[i];
      if (ch === '(') { stack.push({}); i++; }
      else if (ch === ')') {
        if (stack.length === 1) throw '括号不匹配';
        if (Object.keys(stack[stack.length - 1]).length === 0) throw '括号内为空';
        i++;
        let j = i; while (j < seg.length && /\d/.test(seg[j])) j++;
        const n = (j > i) ? subNum(seg.slice(i, j), '括号倍数') : 1;
        const group = stack.pop();
        const top = stack[stack.length - 1];
        for (const el in group) top[el] = (top[el] || 0) + group[el] * n;
        i = j;
      }
      else if (/[A-Z]/.test(ch)) {
        let sym = ch;
        if (i + 1 < seg.length && /[a-z]/.test(seg[i + 1])) { sym += seg[i + 1]; }
        if (!(sym in MASS)) throw '无法识别的元素符号：' + sym;
        i += sym.length;
        let j = i; while (j < seg.length && /\d/.test(seg[j])) j++;
        const n = (j > i) ? subNum(seg.slice(i, j), '下标') : 1;
        const top = stack[stack.length - 1];
        top[sym] = (top[sym] || 0) + n;
        i = j;
      }
      else if (/[a-z]/.test(ch)) { throw '元素符号位置出现小写字母（' + ch + '），请检查大小写'; }
      else { throw '无法识别的字符：' + ch; }
    }
    if (stack.length !== 1) throw '括号不匹配';
    if (mult > 1) for (const el in counts) counts[el] *= mult;
    if (Object.keys(counts).length === 0) throw '存在空的片段';
    return counts;
  }
  window.mwParse = function (input) {
    const segs = String(input).replace(/\s*([·.*])\s*/g, '·').split('·');   // 归一化分隔符两侧空白；片段内空白仍非法
    const total = {};
    for (const seg of segs) {
      if (!seg.trim()) throw '存在空的片段（检查分隔符）';
      const c = parseSegment(seg);
      for (const el in c) total[el] = (total[el] || 0) + c[el];
    }
    if (!Object.keys(total).length) throw '不是有效的化学式';
    let mw = 0;
    for (const el in total) mw += MASS[el] * total[el];
    if (!(mw > 0)) throw '不是有效的化学式';
    return { mw: Math.round(mw * 100000) / 100000, counts: total };
  };
})();
