(function(){
  var KEY='brandCustomAvatar';
  var avatars=[
    'avatars/avatar1.png',
    'avatars/avatar2.png',
    'avatars/avatar3.png',
    'avatars/avatar4.png',
    'avatars/avatar5.png'
  ];
  var quotes=[
    '今天的努力，是明天选择的底气。',
    '你走的每一步，都算数。',
    '自律即自由，坚持即答案。',
    '不是等状态好才学，而是学了状态才会好。',
    '专注当下，未来自有回响。',
    '你的对手只有昨天的自己。',
    '把"我不会"改成"我正在会"。',
    '高效一小时，胜过敷衍一整天。',
    '沉下心，答案自来。',
    '你只管努力，时间会给你盖章。',
    '别让明天的自己后悔今天没开始。',
    '学习是最高效的复利。',
    '每一次坚持，都是在给未来投票。',
    '别赶路，去感受路，但别停下。',
    '你的潜力，远比你以为的大。',
    '慢慢来，比较快。',
    '今天的笔记，是考场上的底气。',
    '保持饥饿，保持愚蠢，保持前进。',
    '当你觉得累的时候，正是上坡的时候。',
    '学习是孤独的修行，也是清醒的狂欢。',
    '把焦虑换成行动，把犹豫换成专注。',
    '你不需要很厉害才开始，但你需要开始才会很厉害。',
    '每一页翻过去，都是离目标更近一步。',
    '最好的时机是现在，其次是马上。',
    '稳定输出，胜过一时爆发。',
    '做难而正确的事，时间会站在你这边。',
    '今天的认真，是给未来的自己写一封感谢信。',
    '不惧慢，只怕站。',
    '你的专注，正在悄悄改变命运的轨迹。',
    '橙子相信你，今天也继续发光。'
  ];
  function daySeed(){
    var d=new Date();
    return d.getFullYear()*366 + d.getMonth()*31 + d.getDate();
  }
  function setAvatar(url){
    var el=document.getElementById('brandAvatar');
    if(el) el.style.backgroundImage='url("'+url+'")';
  }
  function readCustom(){
    /* 值以 JSON 字符串形式存储，便于纳入统一备份/导入；兼容早期存的裸 dataURL */
    var raw=null;
    try{ raw=localStorage.getItem(KEY); }catch(e){ return null; }
    if(!raw) return null;
    if(raw.charAt(0)==='"'){ try{ return JSON.parse(raw); }catch(e){ return raw; } }
    return raw;
  }
  function render(){
    var custom=readCustom();
    setAvatar(custom || avatars[daySeed()%avatars.length]);
    var qe=document.getElementById('brandQuote');
    if(qe) qe.textContent=quotes[daySeed()%quotes.length];
  }
  function setupUpload(){
    var el=document.getElementById('brandAvatar');
    if(!el) return;
    var input=document.createElement('input');
    input.type='file'; input.accept='image/*'; input.style.display='none';
    input.onchange=function(){
      var file=input.files[0];
      if(!file) return;
      var reader=new FileReader();
      reader.onload=function(e){
        var img=new Image();
        img.onload=function(){
          var size=128;
          var canvas=document.createElement('canvas');
          canvas.width=size; canvas.height=size;
          var ctx=canvas.getContext('2d');
          var s=Math.min(img.width, img.height);
          var sx=(img.width-s)/2, sy=(img.height-s)/2;
          ctx.beginPath();
          ctx.arc(size/2, size/2, size/2, 0, Math.PI*2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
          var data=canvas.toDataURL('image/png');
          try{ localStorage.setItem(KEY, JSON.stringify(data)); }catch(err){}
          setAvatar(data);
        };
        img.src=e.target.result;
      };
      reader.readAsDataURL(file);
    };
    document.body.appendChild(input);
    el.addEventListener('click', function(){ input.click(); });
    el.title='点击换头像';
  }
  function init(){ render(); setupUpload(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();