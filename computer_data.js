window.POLITICS = {
 "framework": {
  "fwVer": 4,
  "chapters": [
   {
    "cnNum": "第一部分",
    "name": "C语言程序设计（约100分）",
    "points": [
     {
      "idx": 1,
      "title": "C语言程序基本结构",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "#include <stdio.h>\nint main(){\n  /* 语句 */\n  return 0;\n}",
      "explain": "一个标准C程序由若干函数组成，必须有且仅有一个 main 函数作为程序入口。\n【定义】预处理指令#include把头文件内容包含进来；stdio.h 提供输入输出函数。\n【用途】所有上机题、写程序题都套这个骨架。\n【记忆】先写 #include 与 int main(){...return 0;}，再往大括号里填语句。",
      "code": "#include <stdio.h>\nint main(){\n    printf(\"Hello\");\n    return 0;\n}"
     },
     {
      "idx": 2,
      "title": "C语言特点与开发步骤",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "特点：简洁、运算符丰富、可直接操作硬件(指针)、执行效率高。\n开发步骤：编辑(.c) → 编译(.obj) → 连接(.exe) → 运行。",
      "explain": "【方法】零基础先用 Dev-C++ 或 VS Code + gcc 把第一个程序跑通，建立“写代码—编译—看结果”手感。\n【易错】改完代码必须重新“编译运行”，否则看到的是旧结果。"
     },
     {
      "idx": 3,
      "title": "标识符与关键字",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "标识符：字母/下划线开头，后跟字母数字下划线，区分大小写。\n关键字(保留字)：int/if/for/while/return/char/float/void/struct 等，不能作变量名。",
      "explain": "【定义】标识符是变量、函数等名字。\n【易错】不能用关键字命名；区分大小写（sum 与 Sum 不同）；长度建议见名知意。"
     }
    ]
   },
   {
    "cnNum": "第二章",
    "name": "数据的存储与运算",
    "points": [
     {
      "idx": 4,
      "title": "基本数据类型",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "int 整型 / float 单精度浮点 / double 双精度 / char 字符。\n补：short/long/unsigned。",
      "explain": "【定义】数据类型决定变量占多少字节、能存什么范围。\n【考法】选择题常考各类型占用与取值范围、char 本质是整数(ASCII)。\n【记忆】考试默认 int 为整型、float/double 为实型、char 存单个字符。"
     },
     {
      "idx": 5,
      "title": "常量与变量",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "常量：字面量(12, 3.14, 'A', \"abc\")、符号常量 #define PI 3.14。\n变量：先定义后使用，int a=5;",
      "explain": "【定义】常量是固定值，变量是内存中可变存储单元。\n【易错】变量未初始化就使用，值是随机垃圾值；使用变量前先赋值。"
     },
     {
      "idx": 6,
      "title": "整型/实型/字符/字符串常量",
      "cat": "笔记",
      "priority": "高频",
      "level": "1",
      "content": "整型：十进制123、八进制017、十六进制0x1F。\n转义字符：\\n换行 \\t制表 \\'单引号 \\\"双引号 \\\\反斜杠 \\0空字符。\n字符串：\"abc\" 末尾自动加 \\0。",
      "explain": "【易错】'A'是字符(占1字节，存ASCII 65)，\"A\"是字符串(占2字节，'A'+'\\0')。\n【记忆】转义 \\0 是字符串结束标志，strlen 不算它。"
     },
     {
      "idx": 7,
      "title": "运算符（算术/赋值/关系/逻辑/逗号/sizeof）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "算术：+ - * / %(取余)。赋值：= += -=。关系：> < >= <= == !=。\n逻辑：&& || !。逗号：a=1,b=2。sizeof：求字节数。",
      "explain": "【定义】运算符对操作数做运算。\n【易错】整数相除取整(5/2=2)；取余%两边须为整数(5%2=1)；==是相等、=是赋值，常考混淆。\n【记忆】逻辑短路：&&前为假不再算后；||前为真不再算后。"
     },
     {
      "idx": 8,
      "title": "运算符优先级与结合性",
      "cat": "笔记",
      "priority": "高频",
      "level": "1",
      "content": "大致：! > 算术 > 关系 > && > || > 赋值 > 逗号。",
      "explain": "【记忆】拿不准就加括号，既不出错又清晰。考试填空/选择常考优先级误区。"
     },
     {
      "idx": 9,
      "title": "类型转换",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "自动转换：不同类型运算时向“宽”类型提升(char→int→float→double)。\n强制转换：(类型)表达式，如 (int)3.9=3。",
      "explain": "【易错】强制转换只生成临时值，不改变原变量；(int)3.9 截断而非四舍五入。"
     }
    ]
   },
   {
    "cnNum": "第三章",
    "name": "顺序结构",
    "points": [
     {
      "idx": 10,
      "title": "putchar 与 getchar",
      "cat": "考纲",
      "priority": "基础",
      "level": "1",
      "content": "putchar('A') 输出一个字符；ch=getchar() 读入一个字符。",
      "explain": "【用途】单字符输入输出，常用于字符处理题。\n【易错】getchar 会读入回车符，连续读字符时注意缓冲区残留。"
     },
     {
      "idx": 11,
      "title": "printf 格式输出",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "printf(\"a=%d\",a); 常用：%d整型 %f浮点 %c字符 %s字符串 %%%%。\n宽度与小数：%5d(占5位) %.2f(保留2位小数)。",
      "explain": "【定义】按格式控制串输出。\n【易错】float 用 %f、double 也用 %f；%d 不能输出浮点数(会出错)。\n【记忆】%%.2f 控制小数位，是填空/选择高频。"
     },
     {
      "idx": 12,
      "title": "scanf 格式输入",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "scanf(\"%d%d\",&a,&b); 地址符&不能漏。%c读字符、%s读字符串(遇空格结束)。",
      "explain": "【易错】scanf 变量前必须加 &（数组名/字符串除外）；%d 之间空格或回车分隔。\n【记忆】忘写 & 是考试与初学最常见错误。"
     },
     {
      "idx": 13,
      "title": "顺序结构程序举例",
      "cat": "代码",
      "priority": "高频",
      "level": "1",
      "content": "求两数和、交换两数、求圆面积等。",
      "explain": "【方法】顺序结构自上而下执行，先输入→处理→输出。零基础先仿写3个例子建立结构感。",
      "code": "#include <stdio.h>\nint main(){\n    int a,b;\n    scanf(\"%d%d\",&a,&b);\n    printf(\"sum=%d\",a+b);\n    return 0;\n}"
     }
    ]
   },
   {
    "cnNum": "第四章",
    "name": "选择结构",
    "points": [
     {
      "idx": 14,
      "title": "关系与逻辑运算符",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "关系：> < >= <= == !=，结果真为1假为0。逻辑：&& || !。",
      "explain": "【易错】判断相等用 == 不是 =；连续比较 a<b<c 在C中不等于数学含义(先算a<b得0/1再与c比)。"
     },
     {
      "idx": 15,
      "title": "if / if-else / 嵌套 if",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "if(条件) 语句;  if(条件) 语句1; else 语句2;\n多分支用 else if 或嵌套。",
      "explain": "【方法】条件为真(非0)执行。考试常考分段函数、成绩等级、最大最小值。\n【易错】if 后多条语句要加{}，否则只管第一条。",
      "code": "#include <stdio.h>\nint main(){\n    int x;\n    scanf(\"%d\",&x);\n    if(x>=60) printf(\"pass\");\n    else printf(\"fail\");\n    return 0;\n}"
     },
     {
      "idx": 16,
      "title": "条件运算符 ? :",
      "cat": "笔记",
      "priority": "高频",
      "level": "1",
      "content": "max = a>b ? a : b;  // 条件?表达式1:表达式2",
      "explain": "【记忆】唯一的三目运算符，可替代简单 if-else，简写求最值。"
     },
     {
      "idx": 17,
      "title": "switch-case 多分支",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "switch(整型/字符表达式){ case 常量: 语句; break; default: ... }",
      "explain": "【易错】case 后必须是常量；忘记 break 会“贯穿”执行后续 case；switch 表达式只能是整型/字符型。"
     }
    ]
   },
   {
    "cnNum": "第五章",
    "name": "循环结构",
    "points": [
     {
      "idx": 18,
      "title": "while 与 do-while",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "while(条件){...} 先判后执行；do{...}while(条件); 先执行后判(至少一次)。",
      "explain": "【易错】循环体里必须有改变条件的语句，否则死循环；do-while 即使条件假也执行一次。",
      "code": "#include <stdio.h>\nint main(){\n    int i=1,s=0;\n    while(i<=100){ s+=i; i++; }\n    printf(\"%d\",s);\n    return 0;\n}"
     },
     {
      "idx": 19,
      "title": "for 循环",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "for(初值;条件;步长){...} 等价于 while 的紧凑写法。",
      "explain": "【方法】for(i=1;i<=n;i++) 是求和/遍历最常用骨架。\n【易错】for(;;) 是死循环；三个表达式均可省略但分号不能省。"
     },
     {
      "idx": 20,
      "title": "break 与 continue",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "break 跳出整个循环；continue 跳过本次剩余、进入下一轮。",
      "explain": "【记忆】break 在 switch 中是跳出 switch；在循环中是跳出循环，二者不同语境。"
     },
     {
      "idx": 21,
      "title": "循环嵌套",
      "cat": "笔记",
      "priority": "高频",
      "level": "1",
      "content": "双重 for 常用于打印图形、二维数组遍历、穷举。",
      "explain": "【方法】外层控制行、内层控制列；九九乘法表、水仙花数、质数判断都用嵌套。"
     },
     {
      "idx": 22,
      "title": "循环典型例题（累加/阶乘/素数）",
      "cat": "代码",
      "priority": "必考",
      "level": "1",
      "content": "1~100求和、n!、判断素数、 Fibonacci。",
      "explain": "【方法】累加用 s+=i；阶乘用 f*=i；素数用 2~√n 试除。这些是循环与选择综合题。",
      "code": "#include <stdio.h>\nint main(){\n    int n=5,i,f=1;\n    for(i=1;i<=n;i++) f*=i;\n    printf(\"%d!=%d\",n,f);\n    return 0;\n}"
     }
    ]
   },
   {
    "cnNum": "第六章",
    "name": "数组",
    "points": [
     {
      "idx": 23,
      "title": "一维数组",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "定义 int a[10]; 下标 0~9。a[0] 是首元素。\n初始化 int a[5]={1,2,3}; 未赋初值元素为0(全局)或随机(局部)。",
      "explain": "【易错】下标从0开始；a[10] 越界访问不报错但会破坏内存(考试爱考越界后果)。\n【记忆】长度用 sizeof(a)/sizeof(a[0])。"
     },
     {
      "idx": 24,
      "title": "二维数组",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "int a[3][4]; 行3列4，a[i][j]。\n初始化可按行 int a[2][3]={{1,2,3},{4,5,6}};",
      "explain": "【易错】内存按“行优先”连续存放；遍历用双重 for(外行内列)。\n【记忆】a[i][j] 行列不要写反。"
     },
     {
      "idx": 25,
      "title": "字符数组与字符串",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "char s[20]=\"hello\"; 末尾自动加 \\0。\n常用函数(需 #include<string.h>)：strcpy 复制 / strlen 长度 / strcat 连接 / strcmp 比较。",
      "explain": "【易错】strcmp(s1,s2) 返回0表示相等(不是==)；strlen 不算 \\0；字符数组要留 \\0 空间。",
      "code": "#include <stdio.h>\n#include <string.h>\nint main(){\n    char s[20]=\"hello\";\n    printf(\"%d\",strlen(s));\n    return 0;\n}"
     },
     {
      "idx": 26,
      "title": "数组典型算法（排序/查找/矩阵）",
      "cat": "代码",
      "priority": "必考",
      "level": "1",
      "content": "冒泡排序、选择排序、顺序查找、二分查找、矩阵转置。",
      "explain": "【方法】冒泡是相邻比较交换；排序与查找是数据结构与C的综合高频考点，务必能手写。",
      "code": "void bubble(int a[],int n){\n    int i,j,t;\n    for(i=0;i<n-1;i++)\n      for(j=0;j<n-1-i;j++)\n        if(a[j]>a[j+1]){t=a[j];a[j]=a[j+1];a[j+1]=t;}\n}"
     }
    ]
   },
   {
    "cnNum": "第七章",
    "name": "函数",
    "points": [
     {
      "idx": 27,
      "title": "函数定义/调用/声明",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "定义：返回类型 函数名(形参){...}\n调用：函数名(实参);  声明(原型)：返回类型 函数名(形参);",
      "explain": "【方法】“先定义后使用”，或在使用前写函数声明。\n【易错】无返回值的函数返回类型写 void；有返回值必须用 return 返回。"
     },
     {
      "idx": 28,
      "title": "参数传递（值传递）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "C语言函数参数是值传递：把实参的值 copy 给形参，函数内改形参不影响实参。",
      "explain": "【易错】想在函数里改外部变量，要用指针(传地址)。这是选择/填空/简答高频。"
     },
     {
      "idx": 29,
      "title": "函数的嵌套调用与递归",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "递归：函数自己调用自己，必须有终止条件。例：n!、斐波那契。",
      "explain": "【方法】递归=终止条件+逼近终止的递推。\n【记忆】递归效率低但代码简洁，考试常考阶乘/汉诺塔/斐波那契。",
      "code": "int fact(int n){\n    if(n<=1) return 1;\n    return n*fact(n-1);\n}"
     },
     {
      "idx": 30,
      "title": "局部变量与全局变量",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "局部变量：函数内定义，仅函数内有效。全局变量：函数外定义，全程有效。",
      "explain": "【易错】同名时局部优先(屏蔽全局)；全局变量降低模块独立性，慎用。"
     },
     {
      "idx": 31,
      "title": "变量存储类别（auto/static/extern/register）",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "static 局部变量：只初始化一次，函数结束后值保留。\nextern：声明外部全局变量。",
      "explain": "【考法】常考 static 局部变量的“记忆”特性——多次调用函数其值累加。"
     },
     {
      "idx": 32,
      "title": "编译预处理（#define 宏）",
      "cat": "笔记",
      "priority": "高频",
      "level": "1",
      "content": "#define 宏名 串  做文本替换，无类型检查。#define MAX 100。",
      "explain": "【易错】宏只是替换不是函数，带参宏注意加括号避免优先级错误，如 #define SQR(x) ((x)*(x))。"
     }
    ]
   },
   {
    "cnNum": "第八章",
    "name": "指针",
    "points": [
     {
      "idx": 33,
      "title": "指针概念与定义",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "指针=地址。int *p; p=&a;  *p 是 p 指向的值。&取地址、*间接访问。",
      "explain": "【定义】指针变量存放另一变量的地址。\n【易错】int *p; 中 *p 表示“指向整型的指针”，不是乘号。\n【记忆】p 存地址，*p 取内容，&a 取地址——三者关系必考。",
      "code": "#include <stdio.h>\nint main(){\n    int a=10,*p=&a;\n    printf(\"%d %d\",a,*p);\n    return 0;\n}"
     },
     {
      "idx": 34,
      "title": "指针运算与数组",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "p+1 指向同类型下一元素。数组名 a 是首元素地址，a[i] 等价于 *(a+i)。",
      "explain": "【易错】p++ 移动一个元素大小(非1字节)；a[i] 与 *(a+i) 完全等价，指针法更快。"
     },
     {
      "idx": 35,
      "title": "指针与字符串",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "char *s=\"abc\"; 指向字符串常量。char s[]=\"abc\"; 是字符数组可修改。",
      "explain": "【易错】char *s 指向常量区，不能 s[0]='x' 修改；字符数组才能改。"
     },
     {
      "idx": 36,
      "title": "指针作函数参数",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "传指针(地址)可在函数内修改外部变量，实现“双向传递”。",
      "explain": "【方法】交换两数 swap(int *x,int *y) 用指针，是填空/简答经典题。",
      "code": "void swap(int *x,int *y){\n    int t=*x; *x=*y; *y=t;\n}"
     },
     {
      "idx": 37,
      "title": "指针函数与函数指针",
      "cat": "笔记",
      "priority": "高频",
      "level": "1",
      "content": "指针函数：返回指针的函数 int *f();。函数指针：指向函数的指针 int (*p)();。",
      "explain": "【记忆】*靠近函数名是指针函数(返回指针)；*在括号里包住函数名是函数指针。"
     },
     {
      "idx": 38,
      "title": "指针数组与多级指针",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "指针数组：int *p[10];(元素是指针)。指向指针的指针：int **pp;。",
      "explain": "【用途】指针数组常用于指向多个字符串(如菜单)。"
     }
    ]
   },
   {
    "cnNum": "第九章",
    "name": "结构体与文件",
    "points": [
     {
      "idx": 39,
      "title": "结构体定义与引用",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "struct Student{ int id; char name[20]; float score; };\n结构体变量 s; 引用成员 s.score 或 p->score(指针)。",
      "explain": "【定义】结构体把不同类型数据组合成一个整体。\n【易错】结构体类型定义后变量要单独定义；指针访问成员用 ->。"
     },
     {
      "idx": 40,
      "title": "结构体数组与指针",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "struct Student st[3]; 结构体数组常用于学生/记录管理。",
      "explain": "【方法】结合循环遍历结构体数组，是“学生成绩管理”类综合题基础。",
      "code": "struct Student{ int id; float sc; };\nstruct Student st[3]={{1,90},{2,85}};"
     },
     {
      "idx": 41,
      "title": "文件操作",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "FILE *fp; fp=fopen(\"a.txt\",\"r\");  读:fscanf/fgets/fread；写:fprintf/fputs/fwrite；fclose(fp);",
      "explain": "【易错】打开方式 \"r\"读 \"w\"写(覆盖) \"a\"追加；用完必须 fclose，否则数据可能丢失。\n【记忆】文件操作是“读/写数据到磁盘”，考试常考 fopen 模式与读写函数配对。"
     }
    ]
   },
   {
    "cnNum": "第二部分",
    "name": "数据结构（约100分）",
    "points": [
     {
      "idx": 42,
      "title": "数据结构与算法基本概念",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "数据结构=逻辑结构(线性/树/图)+存储结构(顺序/链式)。\n算法特性：有穷/确定/可行/输入/输出。",
      "explain": "【定义】数据结构研究数据间关系与操作。\n【考法】常考“逻辑结构与存储结构区别”“算法五大特性”。"
     },
     {
      "idx": 43,
      "title": "算法复杂度（时间/空间）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "时间复杂度 T(n) 反映基本操作随规模n的增长；空间复杂度 S(n) 反映额外空间。\n常见：O(1)<O(log n)<O(n)<O(n log n)<O(n²)。",
      "explain": "【易错】大O只关心最高次项与系数；O(1)是常数时间不是“一次操作”。\n【记忆】单层循环O(n)、双层O(n²)、二分O(log n)。"
     }
    ]
   },
   {
    "cnNum": "第十一章",
    "name": "线性表",
    "points": [
     {
      "idx": 44,
      "title": "线性表定义与顺序存储",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "顺序表：用一段连续存储单元存放，下标随机存取 O(1)。\n插入/删除需移动元素，平均 O(n)。",
      "explain": "【定义】线性表是 n 个同类型元素有限序列。\n【易错】顺序表插入第 i 个位置，元素从后往前后移；删除则前移。\n【记忆】顺序表优点：随机访问快；缺点：插入删除慢、长度固定。"
     },
     {
      "idx": 45,
      "title": "链式存储（单链表）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "结点=数据域+指针域(next)。头指针指向首结点。\n建表/插入(改指针)/删除/查找。",
      "explain": "【方法】链表靠指针串联，插入删除只改指针不必移动元素 O(1)(已知位置)。\n【易错】插入顺序：先连后断，否则断链丢失后续。\n【记忆】链表不能随机访问，找第i个要遍历 O(n)。",
      "code": "typedef struct Node{ int data; struct Node *next; }Node;\nNode *head=NULL;"
     },
     {
      "idx": 46,
      "title": "双链表与循环链表",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "双链表结点含 prior 与 next，可双向遍历。循环链表尾指向头形成环。",
      "explain": "【记忆】双链表删除/前插更方便；循环链表从任一结点可遍历全表。"
     },
     {
      "idx": 47,
      "title": "顺序表 vs 链表比较",
      "cat": "笔记",
      "priority": "高频",
      "level": "1",
      "content": "顺序表：随机访问快、存储紧凑；链表：插入删除方便、动态扩容。",
      "explain": "【考法】简答常考二者优缺点与适用场景。"
     }
    ]
   },
   {
    "cnNum": "第十二章",
    "name": "栈、队列和数组",
    "points": [
     {
      "idx": 48,
      "title": "栈（Stack）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "栈：后进先出 LIFO。操作 push(入栈)/pop(出栈)/top(取顶)。\n顺序栈用数组+栈顶指针；链栈用链表。",
      "explain": "【定义】限定仅在表尾(栈顶)插入删除。\n【应用】函数递归、括号匹配、表达式求值、进制转换。\n【易错】栈满/栈空判断，上溢下溢。"
     },
     {
      "idx": 49,
      "title": "队列（Queue）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "队列：先进先出 FIFO。队尾入、队头出。循环队列用模运算判空/满。",
      "explain": "【定义】只允许一端入一端出的线性表。\n【易错】循环队列判满常用“牺牲一个单元”或计数法；队空 front==rear，队满 (rear+1)%max==front。\n【应用】广度优先、缓冲区、排队模拟。"
     },
     {
      "idx": 50,
      "title": "数组与特殊矩阵",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "二维数组按行优先存。对称矩阵/三角矩阵可压缩存储；稀疏矩阵用三元组表。",
      "explain": "【记忆】压缩存储为了省空间，是选择题考点。"
     }
    ]
   },
   {
    "cnNum": "第十三章",
    "name": "串",
    "points": [
     {
      "idx": 51,
      "title": "串的定义与存储",
      "cat": "考纲",
      "priority": "基础",
      "level": "1",
      "content": "串=字符组成的有限序列。存储：定长顺序、堆分配、块链。",
      "explain": "【定义】字符串是特殊线性表(元素为字符)。\n【易错】C中串以 \\0 结尾；求长度、比较用库函数。"
     },
     {
      "idx": 52,
      "title": "模式匹配（BF / KMP）",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "BF：主串与模式串逐位比较，失配回退，最坏 O(n*m)。KMP：利用部分匹配表 next[] 不回退主串，O(n+m)。",
      "explain": "【记忆】BF好写但慢；KMP高效但难，考试常考 next 数组含义与手算。"
     }
    ]
   },
   {
    "cnNum": "第十四章",
    "name": "树与二叉树",
    "points": [
     {
      "idx": 53,
      "title": "树与二叉树概念",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "结点度、叶子、双亲/孩子、层次、深度。\n二叉树：每个结点最多2个子树，且左右有序。",
      "explain": "【定义】树是 n 个结点的有限集。\n【易错】二叉树≠度为2的树；有序，左右不能互换。"
     },
     {
      "idx": 54,
      "title": "二叉树性质",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "性质1：第 i 层最多 2^(i-1) 个结点。\n性质2：深度为k的二叉树最多 2^k-1 个结点。\n性质3：叶子 n0 与度为2结点 n2：n0=n2+1。\n性质4：完全二叉树按层编号，双亲与孩子下标关系。",
      "explain": "【记忆】n0=n2+1 是填空/选择必考；完全二叉树编号 i 的左孩子 2i、右孩子 2i+1。"
     },
     {
      "idx": 55,
      "title": "满二叉树与完全二叉树",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "满二叉树：每层都满。完全二叉树：除最后一层，上面满且最后一层从左连续。",
      "explain": "【记忆】完全二叉树适合用一维数组顺序存储(下标连续)。"
     },
     {
      "idx": 56,
      "title": "二叉树的遍历",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "先序(根左右) / 中序(左根右) / 后序(左右根) / 层序(逐层)。",
      "explain": "【方法】递归定义，画树手算。\n【易错】三种遍历区别只在“访问根”的时机；已知先序+中序可唯一还原二叉树。\n【记忆】考试几乎必考画遍历序列或据两种序重建。",
      "code": "void preorder(Node *t){\n    if(!t) return;\n    printf(\"%d \",t->data);\n    preorder(t->left);\n    preorder(t->right);\n}"
     },
     {
      "idx": 57,
      "title": "线索二叉树（了解）",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "利用空指针域指向遍历前驱/后继，加快遍历。",
      "explain": "【记忆】选择题了解概念即可。"
     },
     {
      "idx": 58,
      "title": "哈夫曼树（了解）",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "带权路径最短的二叉树，用于数据压缩编码。",
      "explain": "【记忆】哈夫曼编码是无前缀编码，选择题考概念。"
     }
    ]
   },
   {
    "cnNum": "第十五章",
    "name": "图",
    "points": [
     {
      "idx": 59,
      "title": "图的基本概念",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "顶点、边、度(入度/出度)、有向图/无向图、连通图。",
      "explain": "【易错】无向图度数和=2×边数；有向图入度+出度=总度数。"
     },
     {
      "idx": 60,
      "title": "图的存储（邻接矩阵/邻接表）",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "邻接矩阵：n×n 二维数组，适合稠密图。邻接表：链表数组，适合稀疏图。",
      "explain": "【记忆】矩阵空间 O(n²)；邻接表空间 O(n+e)。考试考两者优劣。"
     },
     {
      "idx": 61,
      "title": "图的遍历（DFS/BFS）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "DFS 深度优先(栈/递归)，BFS 广度优先(队列)。",
      "explain": "【方法】DFS 一条路走到底再回溯；BFS 一层层扩散。二者都需 visited 标记防重复。\n【应用】连通分量、最短路径(BFS无权图)。"
     },
     {
      "idx": 62,
      "title": "最小生成树 / 最短路径（了解）",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "Prim/Kruskal 求最小生成树；Dijkstra 求单源最短路径。",
      "explain": "【记忆】考概念与思想，不要求手推大题。"
     }
    ]
   },
   {
    "cnNum": "第十六章",
    "name": "查找",
    "points": [
     {
      "idx": 63,
      "title": "顺序查找",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "从表头到表尾逐个比，平均 ASL=(n+1)/2，时间 O(n)。",
      "explain": "【记忆】最简单，无需有序；适用于无序小表。"
     },
     {
      "idx": 64,
      "title": "折半查找（二分）",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "前提：有序表。每次取中点，相等返回，否则舍去一半。时间 O(log n)。",
      "explain": "【方法】low=0,high=n-1,mid=(low+high)/2；相等返回，<往后半，>往前半。\n【易错】必须有序；循环条件 low<=high。\n【记忆】效率远高于顺序查找，填空/计算常考比较次数。",
      "code": "int bin(int a[],int n,int x){\n    int l=0,h=n-1,m;\n    while(l<=h){ m=(l+h)/2;\n        if(a[m]==x) return m;\n        else if(a[m]<x) l=m+1; else h=m-1; }\n    return -1;\n}"
     },
     {
      "idx": 65,
      "title": "分块查找（了解）",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "索引表+块内顺序，块间有序、块内无序。",
      "explain": "【记忆】介于顺序与折半之间。"
     },
     {
      "idx": 66,
      "title": "二叉排序树",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "左子树<根<右子树。查找、插入、删除基于该性质，平均 O(log n)。",
      "explain": "【易错】中序遍历二叉排序树得到递增序列；极端退化成链表时 O(n)。"
     },
     {
      "idx": 67,
      "title": "哈希表（了解概念）",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "哈希函数定位、冲突用开放定址/链地址法。",
      "explain": "【记忆】理想 O(1) 查找；考冲突处理方法。"
     }
    ]
   },
   {
    "cnNum": "第十七章",
    "name": "排序",
    "points": [
     {
      "idx": 68,
      "title": "直接插入排序",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "将元素插入已排序序列的合适位置。最好 O(n)，平均/最坏 O(n²)。稳定。",
      "explain": "【方法】从第二个元素起，向前比较挪动插入。\n【记忆】稳定、适合基本有序数据。"
     },
     {
      "idx": 69,
      "title": "冒泡排序",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "相邻比较，逆序则交换，每趟沉底一个最大。时间 O(n²)，稳定。",
      "explain": "【方法】双层循环，内层比较相邻。\n【易错】加 flag 可提前结束(已有序)。\n【记忆】最易手写的排序，填空/代码题高频。",
      "code": "for(i=0;i<n-1;i++)\n  for(j=0;j<n-1-i;j++)\n    if(a[j]>a[j+1]) swap;"
     },
     {
      "idx": 70,
      "title": "简单选择排序",
      "cat": "考纲",
      "priority": "高频",
      "level": "1",
      "content": "每趟选最小与首位交换。时间 O(n²)，不稳定。",
      "explain": "【记忆】交换次数少但比较次数固定 O(n²)；不稳定(相同值可能换序)。"
     },
     {
      "idx": 71,
      "title": "快速排序",
      "cat": "考纲",
      "priority": "必考",
      "level": "1",
      "content": "选基准 pivot，划分小于/大于两部分，递归。平均 O(n log n)，最坏 O(n²)。不稳定。",
      "explain": "【方法】一次划分让基准归位，再对左右子表递归。\n【易错】最坏发生在已有序(选首尾为基准)；平均最快，是重点算法。",
      "code": "int part(int a[],int l,int h){\n    int p=a[l],i=l,j=h;\n    while(i<j){ while(i<j&&a[j]>=p)j--; a[i]=a[j];\n              while(i<j&&a[i]<=p)i++; a[j]=a[i]; }\n    a[i]=p; return i;\n}"
     },
     {
      "idx": 72,
      "title": "希尔/归并/堆排序（了解）",
      "cat": "笔记",
      "priority": "基础",
      "level": "1",
      "content": "希尔：缩小增量插入。归并：分治合并，稳定 O(n log n)。堆：利用堆结构，O(n log n)。",
      "explain": "【记忆】考复杂度与稳定性比较。"
     },
     {
      "idx": 73,
      "title": "排序算法稳定性与复杂度比较",
      "cat": "笔记",
      "priority": "必考",
      "level": "1",
      "content": "稳定：冒泡、直接插入、归并、基数。不稳定：选择、快排、希尔、堆。\n复杂度：O(n²)有冒泡/插入/选择；O(n log n)有快排/归并/堆。",
      "explain": "【考法】简答/选择必考“哪个稳定、复杂度多少”，务必记表。"
     }
    ]
   }
  ]
 },
 "quizPool": [
  {
    "type": "single",
    "q": "C语言中，main函数的作用是？",
    "answer": "A",
    "explain": "main是程序唯一入口，系统从main开始执行。",
    "ch": "第一章",
    "options": [
      "程序入口",
      "第一个自定义函数",
      "返回值必须为1",
      "可有可无"
    ]
  },
  {
    "type": "single",
    "q": "以下关于标识符正确的是？",
    "answer": "B",
    "explain": "C标识符区分大小写，不能以数字开头，不能是关键字。",
    "ch": "第一章",
    "options": [
      "可以用关键字命名",
      "区分大小写",
      "数字可作开头",
      "长度无限"
    ]
  },
  {
    "type": "single",
    "q": "表达式 5/2 的结果是？",
    "answer": "B",
    "explain": "整数相除结果仍为整数，5/2=2(截断)。",
    "ch": "第二章",
    "options": [
      "2.5",
      "2",
      "2.0",
      "3"
    ]
  },
  {
    "type": "single",
    "q": "设 int a=5; 则 a%=3 后 a 的值是？",
    "answer": "A",
    "explain": "a%=3 即 a=a%3=5%3=2。",
    "ch": "第二章",
    "options": [
      "2",
      "1",
      "5",
      "3"
    ]
  },
  {
    "type": "single",
    "q": "字符串 \"A\" 在内存中占用字节数为？",
    "answer": "B",
    "explain": "字符'A'占1字节，字符串末尾自动加\\0，共2字节。",
    "ch": "第二章",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ]
  },
  {
    "type": "single",
    "q": "scanf(\"%d\", &x) 中 & 的作用是？",
    "answer": "A",
    "explain": "scanf需变量地址，&x取x的地址。",
    "ch": "第三章",
    "options": [
      "取地址",
      "取内容",
      "注释",
      "取最大值"
    ]
  },
  {
    "type": "single",
    "q": "printf(\"%.2f\", 3.14159) 输出？",
    "answer": "A",
    "explain": "%.2f保留2位小数，四舍五入得3.14。",
    "ch": "第三章",
    "options": [
      "3.14",
      "3.14159",
      "3.1",
      "3"
    ]
  },
  {
    "type": "single",
    "q": "判断相等应使用？",
    "answer": "B",
    "explain": "==是相等比较，=是赋值，二者常考混淆。",
    "ch": "第四章",
    "options": [
      "=",
      "==",
      ":",
      "=>"
    ]
  },
  {
    "type": "single",
    "q": "switch语句中表达式不能是？",
    "answer": "C",
    "explain": "switch表达式须为整型或字符型，不能是浮点。",
    "ch": "第四章",
    "options": [
      "int",
      "char",
      "float",
      "枚举"
    ]
  },
  {
    "type": "single",
    "q": "do-while循环的特点是？",
    "answer": "B",
    "explain": "do-while先执行后判断，循环体至少执行一次。",
    "ch": "第五章",
    "options": [
      "先判后执行",
      "至少执行一次",
      "必死循环",
      "不能嵌套"
    ]
  },
  {
    "type": "single",
    "q": "for(;;) 表示？",
    "answer": "B",
    "explain": "三个表达式都省略是死循环。",
    "ch": "第五章",
    "options": [
      "语法错误",
      "死循环",
      "执行一次",
      "不执行"
    ]
  },
  {
    "type": "single",
    "q": "数组 a[10] 的合法下标范围是？",
    "answer": "C",
    "explain": "C数组下标从0开始，a[10]有元素a[0]..a[9]。",
    "ch": "第六章",
    "options": [
      "1~10",
      "0~10",
      "0~9",
      "1~9"
    ]
  },
  {
    "type": "single",
    "q": "strcmp(\"ab\",\"abc\") 返回？",
    "answer": "C",
    "explain": "逐字符比，前两个相等，\"ab\"较短故小于\"abc\"，返回负数。",
    "ch": "第六章",
    "options": [
      "0",
      "正数",
      "负数",
      "1"
    ]
  },
  {
    "type": "single",
    "q": "关于函数参数，C语言采用？",
    "answer": "A",
    "explain": "C默认值传递，形参是实参的副本，函数内改形参不影响实参。",
    "ch": "第七章",
    "options": [
      "值传递",
      "引用传递",
      "地址传递默认",
      "双向传递"
    ]
  },
  {
    "type": "single",
    "q": "递归函数必须包含？",
    "answer": "B",
    "explain": "递归须有终止(边界)条件，否则无限递归。",
    "ch": "第七章",
    "options": [
      "循环",
      "终止条件",
      "全局变量",
      "数组"
    ]
  },
  {
    "type": "single",
    "q": "static局部变量的特性是？",
    "answer": "B",
    "explain": "static局部变量只初始化一次，函数结束后值保留。",
    "ch": "第七章",
    "options": [
      "每次调用重新初始化",
      "只初始化一次且保留值",
      "等同于全局",
      "必须传参"
    ]
  },
  {
    "type": "single",
    "q": "若有 int a=5,*p=&a; 则 *p 的值是？",
    "answer": "B",
    "explain": "*p是p指向的内容，即a的值5。",
    "ch": "第八章",
    "options": [
      "地址",
      "5",
      "0",
      "不确定"
    ]
  },
  {
    "type": "single",
    "q": "数组 a[i] 等价于？",
    "answer": "B",
    "explain": "a[i]与*(a+i)完全等价。",
    "ch": "第八章",
    "options": [
      "*a+i",
      "*(a+i)",
      "&a[i]",
      "a+i"
    ]
  },
  {
    "type": "single",
    "q": "交换两数的正确做法(用指针)是？",
    "answer": "B",
    "explain": "传指针可在函数内修改外部变量实现交换。",
    "ch": "第八章",
    "options": [
      "void f(int x,int y)",
      "void f(int *x,int *y) 内部交换*x,*y",
      "直接 swap(a,b)",
      "无法交换"
    ]
  },
  {
    "type": "single",
    "q": "结构体访问成员的运算符，指针用？",
    "answer": "B",
    "explain": "指针访问成员用 ->，变量用 .。",
    "ch": "第九章",
    "options": [
      ".",
      "->",
      "::",
      "=>"
    ]
  },
  {
    "type": "single",
    "q": "fopen(\"a.txt\",\"w\") 的含义是？",
    "answer": "B",
    "explain": "\"w\"写方式：不存在创建，存在则清空内容。",
    "ch": "第九章",
    "options": [
      "读方式打开",
      "写方式打开(不存在则建,存在则清空)",
      "追加",
      "二进制读"
    ]
  },
  {
    "type": "single",
    "q": "算法时间复杂度描述的是？",
    "answer": "B",
    "explain": "大O描述基本操作随规模n的增长阶。",
    "ch": "第十章",
    "options": [
      "运行秒数",
      "规模n增长趋势",
      "代码行数",
      "内存大小"
    ]
  },
  {
    "type": "single",
    "q": "以下复杂度最小的是？",
    "answer": "C",
    "explain": "O(log n) < O(n) < O(n log n) < O(n²)。",
    "ch": "第十章",
    "options": [
      "O(n²)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ]
  },
  {
    "type": "single",
    "q": "顺序表插入一个元素平均需要移动元素数为？",
    "answer": "C",
    "explain": "顺序表插入/删除需移动元素，平均O(n)。",
    "ch": "第十一章",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ]
  },
  {
    "type": "single",
    "q": "单链表的优点是？",
    "answer": "B",
    "explain": "链表插入删除只改指针，不必移动元素。",
    "ch": "第十一章",
    "options": [
      "随机访问快",
      "插入删除方便",
      "无需指针",
      "不能动态"
    ]
  },
  {
    "type": "single",
    "q": "栈的特点是？",
    "answer": "B",
    "explain": "栈后进先出LIFO，只允许栈顶操作。",
    "ch": "第十二章",
    "options": [
      "FIFO",
      "LIFO",
      "随机",
      "有序"
    ]
  },
  {
    "type": "single",
    "q": "循环队列判断队满常用？",
    "answer": "B",
    "explain": "牺牲一个单元判满：(rear+1)%max==front。",
    "ch": "第十二章",
    "options": [
      "front==rear",
      "(rear+1)%max==front",
      "rear==max",
      "空"
    ]
  },
  {
    "type": "single",
    "q": "二叉树中叶子数n0与度为2结点数n2的关系是？",
    "answer": "B",
    "explain": "二叉树性质：n0=n2+1。",
    "ch": "第十四章",
    "options": [
      "n0=n2",
      "n0=n2+1",
      "n0=n2-1",
      "无关"
    ]
  },
  {
    "type": "single",
    "q": "完全二叉树适合用哪种存储？",
    "answer": "B",
    "explain": "完全二叉树编号连续，适合数组顺序存储。",
    "ch": "第十四章",
    "options": [
      "链式",
      "一维数组顺序",
      "散列",
      "图"
    ]
  },
  {
    "type": "single",
    "q": "二叉树后序遍历顺序是？",
    "answer": "C",
    "explain": "后序：左右根。",
    "ch": "第十四章",
    "options": [
      "根左右",
      "左根右",
      "左右根",
      "层序"
    ]
  },
  {
    "type": "single",
    "q": "图的DFS遍历借助？",
    "answer": "B",
    "explain": "DFS深度优先用栈(或递归)。",
    "ch": "第十五章",
    "options": [
      "队列",
      "栈/递归",
      "哈希",
      "数组"
    ]
  },
  {
    "type": "single",
    "q": "无向图中所有顶点度数之和与边数的关系是？",
    "answer": "B",
    "explain": "每条边贡献2度，度数和=2×边数。",
    "ch": "第十五章",
    "options": [
      "等于边数",
      "等于2倍边数",
      "无关",
      "一半"
    ]
  },
  {
    "type": "single",
    "q": "折半查找的前提是？",
    "answer": "B",
    "explain": "折半查找要求表有序。",
    "ch": "第十六章",
    "options": [
      "无序",
      "有序",
      "链表",
      "哈希"
    ]
  },
  {
    "type": "single",
    "q": "以下排序算法平均时间复杂度 O(n log n) 且不稳定的是？",
    "answer": "C",
    "explain": "快排平均O(nlogn)且不稳定。",
    "ch": "第十七章",
    "options": [
      "冒泡",
      "插入",
      "快速排序",
      "归并"
    ]
  },
  {
    "type": "single",
    "q": "下列稳定的排序是？",
    "answer": "C",
    "explain": "冒泡排序是稳定的。",
    "ch": "第十七章",
    "options": [
      "选择排序",
      "快速排序",
      "冒泡排序",
      "堆排序"
    ]
  },
  {
    "type": "judge",
    "q": "C程序中main函数必须放在程序最前面。",
    "answer": "错",
    "explain": "main位置任意，只要存在即可。",
    "ch": "第一章"
  },
  {
    "type": "judge",
    "q": "C语言区分大小写，sum与Sum是不同变量。",
    "answer": "对",
    "explain": "标识符区分大小写。",
    "ch": "第一章"
  },
  {
    "type": "judge",
    "q": "int a; 未初始化时a的值一定是0。",
    "answer": "错",
    "explain": "局部变量未初始化值是随机的。",
    "ch": "第二章"
  },
  {
    "type": "judge",
    "q": "5%2的结果是1。",
    "answer": "对",
    "explain": "取余运算5%2=1。",
    "ch": "第二章"
  },
  {
    "type": "judge",
    "q": "getchar()可以读入一个字符。",
    "answer": "对",
    "explain": "getchar读取单个字符。",
    "ch": "第三章"
  },
  {
    "type": "judge",
    "q": "if后面若有多条语句必须用{}括起来。",
    "answer": "对",
    "explain": "否则if只管第一条语句。",
    "ch": "第四章"
  },
  {
    "type": "judge",
    "q": "break可以跳出switch语句。",
    "answer": "对",
    "explain": "switch中的break跳出switch。",
    "ch": "第四章"
  },
  {
    "type": "judge",
    "q": "for循环的三个表达式都不能省略。",
    "answer": "错",
    "explain": "都可省略(分号保留)，for(;;)为死循环。",
    "ch": "第五章"
  },
  {
    "type": "judge",
    "q": "数组下标从1开始。",
    "answer": "错",
    "explain": "C数组下标从0开始。",
    "ch": "第六章"
  },
  {
    "type": "judge",
    "q": "strlen(\"abc\")的值是3。",
    "answer": "对",
    "explain": "字符串长度不含\\0，为3。",
    "ch": "第六章"
  },
  {
    "type": "judge",
    "q": "C语言函数参数是引用传递。",
    "answer": "错",
    "explain": "默认是值传递。",
    "ch": "第七章"
  },
  {
    "type": "judge",
    "q": "指针变量存放的是另一个变量的地址。",
    "answer": "对",
    "explain": "指针即地址。",
    "ch": "第八章"
  },
  {
    "type": "judge",
    "q": "char *s=\"abc\"; 可以通过 s[0]='x' 修改内容。",
    "answer": "错",
    "explain": "指向字符串常量，内容不可改。",
    "ch": "第八章"
  },
  {
    "type": "judge",
    "q": "结构体可以把不同类型的数据组合在一起。",
    "answer": "对",
    "explain": "结构体是聚合类型。",
    "ch": "第九章"
  },
  {
    "type": "judge",
    "q": "栈和队列都是线性表。",
    "answer": "对",
    "explain": "二者都是受限线性表。",
    "ch": "第十二章"
  },
  {
    "type": "judge",
    "q": "满二叉树一定是完全二叉树。",
    "answer": "对",
    "explain": "满二叉树满足完全二叉树定义。",
    "ch": "第十四章"
  },
  {
    "type": "judge",
    "q": "已知二叉树先序和中序遍历可唯一确定该树。",
    "answer": "对",
    "explain": "先序定根、中序分左右，可唯一重建。",
    "ch": "第十四章"
  },
  {
    "type": "judge",
    "q": "邻接矩阵适合表示稀疏图。",
    "answer": "错",
    "explain": "邻接矩阵空间O(n²)，适合稠密图；稀疏图用邻接表。",
    "ch": "第十五章"
  },
  {
    "type": "judge",
    "q": "二分查找要求数据有序。",
    "answer": "对",
    "explain": "折半查找须有序表。",
    "ch": "第十六章"
  },
  {
    "type": "judge",
    "q": "冒泡排序是稳定的排序算法。",
    "answer": "对",
    "explain": "冒泡相等不交换，稳定。",
    "ch": "第十七章"
  },
  {
    "type": "blank",
    "q": "C语言程序由函数组成，必须有且只有一个____函数。",
    "answer": "main",
    "explain": "main是程序入口且唯一。",
    "ch": "第一章"
  },
  {
    "type": "blank",
    "q": "设 int a=7,b=2; 则 a/b 的值为____。",
    "answer": "3",
    "explain": "整数相除取整7/2=3。",
    "ch": "第二章"
  },
  {
    "type": "blank",
    "q": "转义字符中表示换行的是____。",
    "answer": "\\n",
    "explain": "\\n是换行符。",
    "ch": "第二章"
  },
  {
    "type": "blank",
    "q": "从键盘读入一个整数应写 scanf(\"%d\", ____x)。",
    "answer": "&",
    "explain": "scanf变量前需&取地址。",
    "ch": "第三章"
  },
  {
    "type": "blank",
    "q": "表示“逻辑与”的运算符是____。",
    "answer": "&&",
    "explain": "&&是逻辑与。",
    "ch": "第四章"
  },
  {
    "type": "blank",
    "q": "do-while循环的循环体至少执行____次。",
    "answer": "1",
    "explain": "先执行后判断，至少一次。",
    "ch": "第五章"
  },
  {
    "type": "blank",
    "q": "访问一维数组第i个元素可用 a[i] 或 ____。",
    "answer": "*(a+i)",
    "explain": "a[i]等价于*(a+i)。",
    "ch": "第六章"
  },
  {
    "type": "blank",
    "q": "函数形参是实参的副本，这种传递方式称为____传递。",
    "answer": "值",
    "explain": "C默认值传递。",
    "ch": "第七章"
  },
  {
    "type": "blank",
    "q": "定义指向整型的指针变量应写 int ____ p;",
    "answer": "*",
    "explain": "int *p 表示整型指针。",
    "ch": "第八章"
  },
  {
    "type": "blank",
    "q": "指针访问结构体成员用运算符____。",
    "answer": "->",
    "explain": "指针用->，变量用.。",
    "ch": "第九章"
  },
  {
    "type": "blank",
    "q": "评价算法效率的量度常用____复杂度。",
    "answer": "时间",
    "explain": "时间复杂度衡量效率。",
    "ch": "第十章"
  },
  {
    "type": "blank",
    "q": "在顺序表中插入元素，平均需要移动____个元素。",
    "answer": "n/2(或O(n))",
    "explain": "平均移动约一半，O(n)。",
    "ch": "第十一章"
  },
  {
    "type": "blank",
    "q": "栈的基本操作原则是____(填英文缩写)。",
    "answer": "LIFO",
    "explain": "栈后进先出LIFO。",
    "ch": "第十二章"
  },
  {
    "type": "blank",
    "q": "二叉树性质：叶子结点数 n0 = n2 ____ 1。",
    "answer": "+",
    "explain": "n0=n2+1。",
    "ch": "第十四章"
  },
  {
    "type": "blank",
    "q": "二叉树____序遍历顺序是 左-根-右。",
    "answer": "中",
    "explain": "中序：左根右。",
    "ch": "第十四章"
  },
  {
    "type": "blank",
    "q": "图的两种基本遍历是DFS和____。",
    "answer": "BFS",
    "explain": "深度优先与广度优先。",
    "ch": "第十五章"
  },
  {
    "type": "blank",
    "q": "在有序表上进行折半查找，时间复杂度为 O(____)。",
    "answer": "log n",
    "explain": "折半查找O(log n)。",
    "ch": "第十六章"
  },
  {
    "type": "blank",
    "q": "冒泡排序和____排序的时间复杂度都是 O(n²)。",
    "answer": "选择(或插入)",
    "explain": "冒泡/选择/插入均为O(n²)。",
    "ch": "第十七章"
  },
  {
    "type": "blank",
    "q": "快速排序的平均时间复杂度是 O(____)。",
    "answer": "n log n",
    "explain": "快排平均O(n log n)。",
    "ch": "第十七章"
  },
  {
    "type": "blank",
    "q": "排序算法中，冒泡、插入、归并是____的(填“稳定”或“不稳定”)。",
    "answer": "稳定",
    "explain": "三者均稳定。",
    "ch": "第十七章"
  },
  {
    "type": "essay",
    "q": "33、简述C 语⾔中常⽤的三种循环语句有",
    "answer": "while、do...while 和for",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "(4) ⾼效性。⾼效性包括时间和空间两个⽅⾯。时间⾼效是指算法设计合理，执⾏效率⾼，",
    "answer": "可以⽤时间复杂度来度量；空间⾼效是指算法占⽤存储容量合理，可以⽤空间复杂度来度量。时间复杂度和空间\n复杂度是衡量算法的两个主要指标。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "2. 程序的基本结构有哪几种，分别描述",
    "answer": "顺序结构：由顺序执行的一组语句构成\n选择结构：根据判断条件进行选择\n循环结构：反复的执行一段代码",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "7. 说出线性表中顺序表与链表的特点、差别",
    "answer": "顺序表\n逻辑上相邻的元素物理位置上也相邻，会产生较多的外部碎片\n能实现随机存取和顺序存取，存储操作速度较快\n插入、删除数据元素时 ，可能需要移动大量元素\n链表\n逻辑上相邻的元素物理位置上不一定相邻\n占用额外的存储空间\n只能实现顺序存取，存取速度较慢。\n插入、删除元素时不必移动其他元素，只需修改指针，速度较快\n两者差别\n存取方式：顺序表可顺序存取、也可随机存取，链表只能顺序存取\n逻辑结构和物理结构方面\n顺序表：逻辑地址相邻，物理地址也相邻\n链表：逻辑地址相邻，物理地址不一定相邻\n插入删除方面\n顺序表：可能会移动大量的元素\n链表：只需修改相应的指针即可",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "8、如何实现以任意长字符串为元素的队列？将一个字符串入队的运算耗时如何？",
    "answer": "在队列中存储字符串指针可以使队列中元素大小相同。按此方法在输入长度为m 的字符\n串时需要O(m)时间，而入队运算只要0（1）时间",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "49、简述库函数和自己定义的函数的区别",
    "answer": "有两种函数：系统提供的库函数和用户根据需要自己定义的函数。如果在程序中使用库函数，必须在本文件的开\n头用include 指令把与该函数有关的头文件包含到本文件中来（如用数学函数时要加上include<math.h>）。如果\n用自己定义的函数，必须先定义，后调用。需要注意：如果函数的调用出现在函数定义位置之前，应该在调用函\n数之前用函数的原型对该函数进行引用声明。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "书中原题：C 语言中如何表示“真”和“假”？系统如何判断一个量的“真”和“假”?",
    "answer": "解：如果有一个逻辑表达式，若其值为“真”，系统会以1 表示，若其值为“假”，会以0 表\n示。但是在判断一个逻辑量的值时，系统会以0 作为“假”，以非0 作为“真”，例如\n3&.&5 的值为“真”，系统给出3&.&.5 的值为1。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "57、使用switch 为什么需要用break",
    "answer": "在用switch 语句实现多分支选择结构时，“case 常量表达式”只起语句标号作用，如果“switch”后面的表达式的值\n与“case”后面的常量表达式的值相等，就执行case 后面的语句。但特别注意：执行完这些语句后不会自动结束，\n会继续执行下一个case 子句中的语句。因此，应在每个case 子句最后加一个break 语句，才能正确实现多分\n支选择结构。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "（2）线性结构",
    "answer": "数据元素之间存在一对一的关系。例如，将学生信息数据按照其入学报到的时间先后顺序进\n行排列，将组成一个线性结构。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "33、为什么要⽤堆来实现优先队列？",
    "answer": "优先队列所需要实现的两种操作，不同于队列和栈，它需要⼀个有序的元素序列，但不要求全部有序，只需要从\n这些元素中找到最⼤（或最⼩）的⼀个元素。⽽堆刚好满⾜这个条件，⽽插⼊元素这个操作，即是由下⾄上的堆\n有序化。队列，栈都是⽤数组或者链表来实现的，针对优先队列，⽤数组和链表实现也是可以的，在队列较⼩，\n⼤量使⽤两种操作之⼀时，或者所操作的元素的顺序已知时，⽤数组和链表⼗分有⽤，但是，在最坏的情况下，\n优先队列⽤这两张⽅法实现所需的时间却是线性的。⽽⽤堆在最坏情况下的时间则是对数级别",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "30. 简述静态分配的顺序串与动态分配的顺序串的区别？",
    "answer": "程序运行前被分配以一个给定大小的数组空间的顺序串称为静态顺序串\n在程序运行过程中，动态分配空间能以链表形式存在的顺序串称为动态顺序串\n静态申在内存一片连续的数据区中，动态串在内存堆中",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "48.置换选择算法",
    "answer": "根据缓冲区的⼤⼩，由外存读⼊记录，当记录充满缓冲区时，选择最⼩的输出，其空缺位置由下⼀个记录来取代，\n输出记录称为当前初始归并段的⼀部分，如果新输出的记录⽐新建⽴归并段最⼤的记录⼩，就不能成为该归并段\n的⼀部分，只能成为下⼀个归并段的选择。重复上述步骤，直到缓冲区中所有记录都⽐当前归并段最⼤记录⼩时，\n就⽣成了⼀个初始归并段，⽤同样的⽅法继续⽣成下⼀个归并段，直到全部记录都处理完毕为⽌。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "选择结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "38、抽象数据类型是什么？它有什么特点？",
    "answer": "抽象数据类型(Abstract Data Type, ADT) ⼀般指由⽤户定义的、表示应⽤问题的数学模型，\n以及定义在这个模型上的⼀组操作的总称，具体包括三部分：数据对象、数据对象上关系的集合以及对数据对象\n的基本操作的集合。⼀旦定义了⼀个抽象数据类型及具体实现，程序设计中就可以像使⽤基本数据类型那样，⼗\n分⽅便地使⽤抽象数据类型。抽象数据类型的设计者根据这些描述给出操作的具体实现，抽象数据类型的使⽤者\n依据这些描述使⽤抽象数据类型。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "31、什么是优先队列？",
    "answer": "在优先队列中，队列中的数据被赋予了优先级。当访问元素时，优先级最⾼的会先被删除。优先队列是最⾼级数\n据先出。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "不一样，它们是否可以认作是同一个数据结构？为什么？",
    "answer": "：不能，运算集合是数据结构的重要组成部分，不同的运算集合所确定的数据结构是不一样的，例如，栈\n与队列它们的逻辑结构与存储结构可以相同，但由于它们的运算集合不一样，所以它们是两种不同的数据结构。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "13.名词解释，满二叉树，完全二叉树，二叉排序树，平衡二叉树。",
    "answer": "满二叉树：高度为H，结点数为2^H-1 的二叉树为满二叉树。\n完全二叉树：除最后一层外，其余各层的节点数量达到最大值，并且最后一层只能在右侧缺少节点。\n二叉排序树：左子树上所有的关键字均小于根结点，右子树上所有关键字均大于根结点。左子树和右子树又分别\n是一棵二叉排序树。\n平衡二叉树：树中每一个结点的左子树，右子树高度之差的绝对值小于等于1",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "22. 什么是线索二叉树",
    "answer": "将⼆叉链表中的空指针改成指向前驱节点或后继的线索。\n线索链表解决了⽆法直接找到该结点在某种遍历序列中的前驱和后继结点的问题， 解决了 ⼆叉链\n表找左、 右孩⼦困难的问题",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "18、什么是结构体",
    "answer": "C 语⾔允许⽤户⾃⼰建⽴由不同类型数据组成的组合型的数据结构，它称为结构体。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "结构体与文件",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "42.归并排序",
    "answer": "“归并”：就是将两个或两个以上的有序表组成⼀个新的有序表。\n假定待排序表有n 个记录，将其视为n 个有序的⼦表，然后两两归并得到n/2 个有序⼦表，再进⾏两两归并，\n直到合并成⼀个⻓度为n 的有序表为⽌。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "17.哈夫曼树",
    "answer": "权：树中的结点往往被赋予⼀个有意义的数值称为该结点的权。\n结点的带权路径⻓度：从树的根到任意节点的路径⻓度与该结点的权值之积称为该结点的带权路径⻓度。\n树的带权路径⻓度：树中所有叶结点的带权路径之和为该树的带权路径⻓度。\n哈夫曼树：带权路径⻓度最⼩的树为哈夫曼树。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "33、C 语⾔采⽤什么系统读写⽂件",
    "answer": "C 语⾔采⽤缓冲⽂件系统，为每⼀个使⽤的⽂件在内存开辟⼀个⽂件缓冲区，在计算机输⼊时，先从⽂件把数据\n读到⽂件缓冲区，然后从缓冲区分别送到各变量的存储单元。在输出时，先从内存数据区将数据送到⽂件缓冲区，\n待放满缓冲区后⼀次输出，这有利于提⾼效率。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "49.最佳归并树",
    "answer": "对于K 路归并算法，可⽤构造K 叉哈夫曼树的⽅法来构造最佳归并树。\n第⼗章图",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "（4）空间分配：顺序存储在静态存储分配下需要预先分配⾜够⼤的空间，动态存储分配虽然可以扩充空间，但",
    "answer": "是需要移动⼤量的元素；链式存储空间在需要时申请即可。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "19. 二叉树的存储结构",
    "answer": "顺序存储：用连续的地址单元自上而下，自左而右的存储结点元素\n链式存储：采用二叉链表存储树的每个结点",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "11. 什么是栈、队列，两者的区别、相同点是什么？",
    "answer": "栈：是一种操作受限的线性表，只能在某一端进行插入和删除操作 （后进先出  LIFO）\n顺序栈：采用顺序存储结构的栈称为顺序栈\n链栈：采用链式存储结构的栈称为链栈\n队列：是一种操作受限线性表，只能在一端进行插入，另一端进行删除 (先进先出  FIFO)\n链队列：用链表示的队列，需要两个指针分别指示队头和队尾\n两者的相同点和区别\n相同点：它们的逻辑结构一样，存储结构一样\n区别：插入、删除的操作不一样",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "20.图的存储⽅式",
    "answer": "邻接矩阵法：⽤⼀个⼀维数组存储图的顶点信息，⽤⼆维数组存储各顶点的邻接关系。存储顶点邻接关系的⼆维\n数组称为邻接矩阵。\n邻接表法：图中每个顶点与其有邻接关系的顶点拉成⼀个单链表，每个顶点都有⼀个单链表。\n⼗字链表法：⼗字链表法是有向图的⼀种链式存储结构。在⼗字链表中，有向图中的每⼀条弧都有⼀个对应的节\n点，每个顶点都有对应的⼀个节点。\n邻接多重表法：",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "图",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "书中原题：2.对⽂件的打开与关闭的含义是什么？为什么要打开和关闭⽂件？",
    "answer": "⽂件使⽤前必须“打开”，⽤完后应当“关闭”。所谓打开，是建⽴相应的⽂件信息区，开辟⽂件缓冲区。由于\n建⽴的⽂件信息区没有名字，只能通过指针变量来引⽤，因此⼀般在打开⽂件时同时使指针变量指向该⽂件的信\n息区，以便程序对⽂件进⾏操作。所谓关闭，是撤销⽂件信息区和⽂件缓冲区，指针变量不再指向该⽂件。使⽤\n完如果不关闭⽂件可能会丢失数据。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "35、⽂件操作的步骤",
    "answer": "⽂件使⽤前必须“打开”，⽤完后应当“关闭”。所谓打开，是建⽴相应的⽂件信息区，开辟⽂件缓冲区。由于建⽴\n的⽂件信息区没有名字，只能通过指针变量来引⽤，因此⼀般在打开⽂件时同时使指针变量指向该⽂件的信息区，\n以便程序对⽂件进⾏操作。所谓关闭，是撤销⽂件信息区和⽂件缓冲区，指针变量不再指向该⽂件。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "1.书中原题：C 语⾔为什么把输⼊输出的功能作为函数，⽽不作为语句的基本部分",
    "answer": "不把输⼊输出作为C 语句的⽬的是使C 语⾔编译系统简单，因为将语句翻译成⼆进制的指令是在编译阶段完成\n的，把输⼊输出操作放在函数中处理，就可以使C 语⾔本身的规模较⼩，编译程序简单，很容易在各种机器上\n实现，程序具有可移植性。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "78、从概念上讲，树、森林和⼆叉树是三种不同的数据结构，将树、森林转化为⼆叉树的基",
    "answer": "本⽬的是什么？并指出树和⼆叉树的主要区别。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "(1）在计算机科学中，指针（Pointer）是编程语⾔中的⼀个对象，利⽤地址，它的值直接指向（points to)存在",
    "answer": "电脑存储器中另⼀个地⽅的值。由于通过地址能找到所需的变量单元，可以说，地址指向该变量单元。因此，将\n地址形象化的称为”指针”。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "26.最短路径",
    "answer": "当图是带权图时，把从⼀个顶点到图中任意⼀个顶点的路径所经过的边的权值之和称为该路径的带权路径⻓度。\n把带权路径最短的那条路径称为最短路径。\n最短路径算法:\n弗洛伊德算法：求任意两个顶点之间的最短路径，权值可为负，利⽤动态规划的思想。先找到的最短路径会直接\n影响之后找到的最短路径，有三层循环，时间复杂度\n是O（n 的三次⽅3），空间复杂度O（n 的2）适⽤于稠密图\n狄杰斯特拉算法：求单源最短路径，权值不能为负，利⽤贪⼼策略，在已经求得最短路径的基础上，求更⻓距离\n的最短路径，适合于稀疏图",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "41.选择排序",
    "answer": "简单选择排序：每趟排序选择关键字最⼩的元素与序列前⾯的元素进⾏交换，每次排序均可确定⼀个元素的最终\n位置。\n堆排序：先将待排元素建成初始堆，以⼤根堆为例，堆顶元素为最⼤值，将其输出后，把堆底元素送⼊堆顶，此\n时堆不满⾜⼤根堆的性质，将堆顶元素向下调整（从堆的最后⼀个⾮叶⼦节点开始，从左到右，从下到上的顺序\n进⾏调整），成为⼤根堆之后再输出堆顶元素，重复上述过程，直到输出所有元素。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "选择结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "(1）优点",
    "answer": "①便于判断两个顶点之间是否有边，即根据A[i][j]=0 或1 来判断。\n②便于计算各个顶点的度。对于⽆向图、邻接矩阵第/⾏元素之和就是顶点i 的度；对于有\n向图、第⾏元素之和就是顶点/的出度、第/列元素之和就是顶点/的⼊度。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "46、什么是数组，为什么要⽤数组",
    "answer": "数组是有序数据的集合。数组中的每⼀个元素都属于同⼀个数据类型。⽤⼀个统⼀的数组名和下标来唯⼀地确定\n数组中的元素。这样就把具有同⼀属性的若⼲个数据组织成⼀个整体，它们再也不是互相孤⽴⽆关的单个数据，\n⽽是互相关联的，便于统⼀处理。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "29.拓扑排序",
    "answer": "AOV ⽹：⽤顶点表示活动，有向边表示活动之间的关系的有向图记为AOV ⽹。在AOV ⽹中选择⼀个没有前驱\n的顶点输出，并删除该顶点和以该顶点为起点的所有有向边，重复上述过程直到AOV ⽹为空或者不存在⽆前驱\n的顶点为⽌。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "4.在一个循环队列中，若约定队首指针指向队首元素的前一个位置。那么，从循环队列",
    "answer": "中删除一个元素时，其操作是先移动队首位置，后取出元素。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "52、C 语言中的常用条件判断的函数和关系运算符",
    "answer": "常用if（条件）..else.…函数进行条件条件判断，常用关系运算符有<><=>==！=",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "1. 算法设计的要求：正确性、可读性、稳健性、高效率低存储量。",
    "answer": "沃斯公式：程序=算法+数据结构。\nDS 专栏收录该内容\n17 篇文章\n14 订阅\n订阅专栏\n蜗牛和牛\n专栏\n关注\n58\n5\n258\n（算法分析）衡量算法的两个标准：时间复杂度和空间复杂度。\n一个算法的设计取决于所选的逻辑结构。\n一个算法的实现取决于所选的存储结构。\n结构化程序设计思想的要求：自顶向下、逐步细化、模块化设计、结构化编程。\n简答题：\n顺序存储结构的特点？（顺序存储和链式存储的优缺点）",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__数据结构名词解释.pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "14. 什么是结构体，结构体变量指针？",
    "answer": "结构体：由用户建立不同类型数据组成的组合型的数据结构\n结构体变量指针：结构体变量的指针就是结构体变量的起始地址，它指向的是结构体基类型",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "顺序表和链表的区别和联系及适用范围？",
    "answer": "顺序表：内存中地址连续\n长度一般不可变更\n蜗牛和牛\n专栏\n关注\n58\n5\n258\n支持随机查找，可在O（1）内查找元素\n适用于需要大量访问元素的，而少量増删元素的程序\n链表： 内存中地址连续或非连续都可以\n长度可实时变化\n不支持随机查找，查找元素的时间复杂度为O（n）\n适用于需要大量增删元素，而对访问元素几乎无要求的程序",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__数据结构名词解释.pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "46.提高外部排序算法的效率",
    "answer": "由于待排文件无法全部放入内存，所以排序期间必须要频繁的进行内外存之间数据的交换，这会耗费大量的时间。\n所以可以通过增加归并路数来减少归并趟数，进而减少I/O 次数。而增加归并路数又会增加内部排序的时间，所\n以引入了败者树。\n增加初始归并段个数，并且不受内存空间的限制，引入了置换-选择算法。\n文件经过置换-选择算法之后得到的是长度不同的初始归并段，如何组织长度不等的出使归并段的归并顺序，使\n得I/O 次数最少，就引入了最佳归并树。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "22、线性表的存储结构：顺序存储结构和链式存储结构。",
    "answer": "顺序存储定义：把逻辑上相邻的数据元素存储在物理上相邻的存储单元中的存储结构。\n链式存储结构: 其结点在存储器中的位置是随意的，即逻辑上相邻的数据元素在物理上\n不一定相邻。通过指针来实现！",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "45.地址：表示变量、数组、函数等在内存单元的具体位置，给内存",
    "answer": "单元进行了编号，这个编号唯一，称之为地址。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__C语言名词解释.pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "62、在用数组名作为函数实参时，既然实际上相应的形参是指针变量，为什么还允许使用形参数组的形式呢？",
    "answer": "这是因为在C 语言中用下标法和指针法都可以访问一个数组（如果有一个数组a,则a 和*(a+i)是无条件等价的），\n用下标法表示比较直观，便于理解。因此许多人愿意用数组名作形参，以便与实参数组对应。从应用的角度看，\n用户可以认为有一个形参数组，它从实参数组那里得到起始地址，因此形参数组与实参数组共占同一段内存单元，\n在调用函数期间，如果改变了形参数组的值，也就是改变了实参数组的值。当然在主调函数中可以利用这些已改\n变的值。对C 语言比较熟练的专业人员往往喜欢用指针变量作形参。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "4.简述各存储结构",
    "answer": "顺序存储：采⽤⼀组连续的存储空间存储数据。\n优点：简单，可以实现随机存取，元素占⽤最少的存储空间。\n缺点：只能使⽤连续的存储单元，会产⽣较多的外部碎⽚。\n链式存储：数据的存储空间是离散的，借助元素中的指针来表示元素之间的逻辑关系。\n优点：不会产⽣外部碎⽚，能充分利⽤所有存储单元。\n缺点：只能顺序存取，每个元素因为存储指针⽽占⽤额外的存储空间。\n索引存储：在存储元素数据的同时还建⽴附加的索引表。\n优点：检索速度快。\n缺点：索引表会占⽤额外的存储空间。\n散列存储：根据元素的关键字直接得出元素的存储地址。\n优点：检索，增加，删除元素的速度都很快。\n缺点：散列函数选择不好可能会出现元素单元的冲突，⽽解决冲突需要额外的开销。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "8. 什么是头结点、头指针，它们的区别是什么？",
    "answer": "头指针：头指针是指向链表表头结点的指针，只要链表存在，该指针就不会变化 ，头指针为\nNULL时表示空表\n头结点：为了方便操作，在单链表第一个数据结点前添加的一个结点\n两者区别\n不管有无头结点，头指针始终指向第一个结点\n头结点是带头结点链表中的第一个结点\n注：为方便理解，如图所示",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "数据结构涉及哪几个方面？",
    "answer": "涉及三个方面，即数据的逻辑结构，数据的存储结构，以及数据的运算集合",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "3.它的左、右子树也分别为二叉树",
    "answer": "平衡二叉树（AVL 树）：或者是空树，或者是符合以下性质的二叉排序树",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "35、提前结束循环的两种方法",
    "answer": "用break 提前结束整个循环，用continue 提前结束本次循环",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "13. 什么是树，它的特点是什么",
    "answer": "树是n（n>=0）个结点的有限集，有且只有一个称为根的结点，根结点无前驱\n特点\n树的根结点没有前驱，除它外的所有结点有且仅有一个前驱结点\n树的所有结点都可以有 零个或多个后继",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "20.图的存储方式",
    "answer": "邻接矩阵法：用一个一维数组存储图的顶点信息，用二维数组存储各顶点的邻接关系。存储顶点邻接关系的二维\n数组称为邻接矩阵。\n邻接表法：图中每个顶点与其有邻接关系的顶点拉成一个单链表，每个顶点都有一个单链表。\n十字链表法：十字链表法是有向图的一种链式存储结构。在十字链表中，有向图中的每一条弧都有一个对应的节\n点，每个顶点都有对应的一个节点。\n邻接多重表法：",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "图",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "61、什么是顺序表？什么是栈？什么是队列？",
    "answer": "：当线性表采⽤顺序存储结构时，即为顺序表。栈是⼀种特殊的线性表，它的特殊性表现在约定了在这种\n线性表中数据的插⼊与删除操作只能在这种线性表的同⼀端进⾏（即栈顶)，因此，栈具有先进后出、后进先出\n的特点。队列也是⼀种特殊的线性表，它的特殊性表现在约定了在这种线性表中数据的插⼊在表的⼀端进⾏，数\n据的删除在表的另⼀端进⾏，因此队列具有先进先出，后进后出的特点。\n头指针与头结点的区别\n头指针：是指向第⼀个节点存储位置的指针，具有标识作⽤，头指针是链表的必要元素，⽆论链表是否为空，头\n指针都存在。\n头结点：是放在第⼀个元素节点之前，便于在第⼀个元素节点之前进⾏插⼊和删除的操作，头结点不是链表的必\n须元素，可有可⽆，头结点的数据域也可以不存储任何信息。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "36、简述整数、实数与字符的存储⽅式",
    "answer": "整数的存储⽅式是直接存储，如0001010；实数采⽤指数形式存储，如124.5 则储存为|+|，1245|+|3|；字符则是以\n⼆进制直接存储，读写时通过计算机按照ASCII 码转换，如65的⼆进制是1000001，在ASCl 码中对应的是字符\nA",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "49、简述库函数和⾃⼰定义的函数的区别",
    "answer": "有两种函数：系统提供的库函数和⽤户根据需要⾃⼰定义的函数。如果在程序中使⽤库函数，必须在本⽂件的开\n头⽤include 指令把与该函数有关的头⽂件包含到本⽂件中来（如⽤数学函数时要加上include<math.h>）。如果\n⽤⾃⼰定义的函数，必须先定义，后调⽤。需要注意：如果函数的调⽤出现在函数定义位置之前，应该在调⽤函\n数之前⽤函数的原型对该函数进⾏引⽤声明。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "36、简述整数、实数与字符的存储方式",
    "answer": "整数的存储方式是直接存储，如0001010；实数采用指数形式存储，如124.5 则储存为|+|，1245|+|3|；字符则\n是以二进制直接存储，读写时通过计算机按照ASCII 码转换，如65 的二进制是1000001，在ASCl 码中对应的\n是字符A",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "39.插入排序",
    "answer": "直接插入排序：每次将一个待排序的记录按其关键字的大小插入到已排好序的子序列中。（1.从前面的有序子表\n中查出待插入元素应该插入的位置2.将已排序的记录逐步向后移动，给待插入元素腾出位置，并将待插入元素复\n制到插入位置。 适用顺序存储/链式存储）\n折半插入排序：如果是顺序存储的线性表，可以通过折半查找的方式来查找待插入元素在有序子序列的位置。确\n定待插入位置之后，可以统一的向后移动位置。\n希尔排序：将待排序列按相隔某个增量分割成若干个子序列，对各个子序列进行直接插入排序，逐渐缩小增量，\n重复上述步骤，直到序列基本有序，再对全体记录进行一次直接插入排序。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "9、说明如何⽤优先队列来实现栈和队列。",
    "answer": "对每个元素⽤其插⼊次序作为其优先级。按此优先级，栈是⼀个极⼤化堆，⽽队列是⼀个极⼩化堆。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "14.队列在层次遍历中的作用：",
    "answer": "首先根结点入队，接着队根结点的子结点进行预处理，等预处理完后，根结点出队，接着刚刚处理的子结点\n入队，这部分的子结点又进行预处理，直到所有的结点都入队出队处理完毕。\n串、数组、广义表（以防万一考到）\n串(string)(或字符串）是由零个或多个字符组成的有限序列\n数组是由类型相同的数据元素构成的有序集合，每个元素称为数组元素，每个元素受 n(n? 1) 个线性关系的约\n束，每个元素在 n 个线性关系中的序号儿 i2, …，in 称为该元素的下标，可 以通过下标访问该数据元素。\n广义表：顾名思义，广义表是线性表的推广，也称为列表。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "5. 数据结构的存储方式有哪几种？",
    "answer": "顺序存储：采用一组连续的存储空间存储地址\n链式存储：数据的存储空间可以不连续，但数据之间的逻辑关系是线性的\n散列存储：根据元素的关键字得到该元素的存储地址\n索引存储：在存储元素的同时建立索引表",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "书中原题：1.什么是⽂件型指针？通过⽂件指针访问⽂件有什么好处？",
    "answer": "缓冲⽂件系统中，关键的概念是“⽂件类型指针”，简称“⽂件指针”。每个被使⽤的⽂件都在内存中开辟⼀个\n相应的⽂件信息区，⽤来存放⽂件的有关信息(如⽂件的名字、⽂件状态及⽂件当前位置等)。这些信息是保存在\n⼀个结构体变量中的。该结构体类型是由系统声明的，取名为FILE。通过⽂件指针访问⽂件的好处是：可以随\n机访问⽂件，有效表示数据结构，动态分配内存，⽅便使⽤字符串，有效使⽤数组。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "31、为什么需要循环结构",
    "answer": "循环结构可以帮助我们完成需要重复常量的问题",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "什么是外部函数？",
    "answer": "如果在定义函数时，在函数首部的最左端加关键字extern，则此函数是外部函数，可供其他文\n件调用。C 语言规定，如果在定义函数时省略extern，则隐含为外部函数。在需要调用此函数的文件\n中，用extern 对函数作声明，表示该函数是在其他文件中定义的外部函数。\n第二十一天：",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "DFS（深度优先搜索遍历）的基本思路？",
    "answer": "假设初始状态是图中所有顶点均未被访问过，则深度优先搜索可从某个顶点V出发，首先访间此顶点（称此顶点为初始点），然后依次从V\n的任一个未被访问的邻接点出发进行深度优先搜索遍历，直到图中所有与有路径相通的顶点都被访问到，若此时图中尚有顶点未被访问，则\n另选图中一个未被访问的顶点作为初始点，重复上述步骤，直到图中所有顶点都被访问过为止",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__数据结构名词解释.pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "不⼀样，它们是否可以认作是同⼀个数据结构？为什么？",
    "answer": "：不能，运算集合是数据结构的重要组成部分，不同的运算集合所确定的数据结构是不⼀样的，例如，栈\n与队列它们的逻辑结构与存储结构可以相同，但由于它们的运算集合不⼀样，所以它们是两种不同的数据结构。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "10、数据结构的存储方式有哪几种？",
    "answer": "：数据结构的存储方式有顺序存储、链式存储、散列存储和索引存储等四种方式。\n算法有那些特性\n算法 (Algorithm) 是为了解决某类问题而规定的一个有限长的操作序列。\n一个算法必须满足以下五个重要特性。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "34、简述文件指针、文件信息区",
    "answer": "文件指针是缓冲文件系统中的一个重要的概念。在文件打开时，在内存建立一个文件信息区，用来存放文件有关\n信息。这个信息区的数据组织成结构体类型，系统把它命名为FILE 类型。文件指针是指向FILE 类型数据的，\n具体来说就是指向某一文件信息区的开头。通过这个指针可以得到文件的有关信息，从而对文件进行操作。这就\n是指针指向文件的含义。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "3. 什么是数据、数据元素、数据项、数据对象，数据类型和抽象数据类型",
    "answer": "数据 ： 数据是所有能被输入到计算机并被计算机程序处理的符号的总称\n数据元素 ： 是数据的基本单位，由若干个数据项组成\n数据项 ：是构成数据元素不可分割的最小单位\n数据对象 ：是具有相同性质的数据元素的集合\n数据类型：⼀组性质相同的值的集合以及定义在这个集合上的⼀组操作的总称\n抽象数据类型：抽象数据组织及相关操作",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "47、如何定义和引用数组",
    "answer": "在定义数组时需要指定这批变量的类型、数组名称和数组中包含多少个元素（即变量），通过数组下表引用数组，\n如int a 定义了一个一维数组长度为5，a 则代表数组的第一个数值",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "2. 链地址法的基本思想是：把具有相同散列地址的记录放在同一个单链表中，称为同义词链表。有个散列地址",
    "answer": "就有m 个单链表，同时用数组HT[0…m-1]存放各个链表的头指针，凡是",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "24. 图的存储方式",
    "answer": "邻接矩阵法：用一维数组存储顶点，二维数组存储边\t (适合稠密图)\n邻接表法：图中每个顶点与其有邻接关系的顶点拉成⼀个单链表， 每个顶点都有⼀个单链表\n（适合稀疏图）",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "图",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "33、简述C 语言中常用的三种循环语句有",
    "answer": "while、do...while 和for",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "头指针和头结点的作用？",
    "answer": "1．头指针是指向链表表头结点的指针，只要链表存在，该指针就不会变化，已知该指针便己知该链表\n2．头结点是在链表的开始结点之前夫妇家的一个结点，当链表是空链表时，该指针为空指针，因此空表和非空表的处理也就统一了",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__数据结构名词解释.pdf.txt）",
    "ch": "指针",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "51、如何将数值作为函数的参数",
    "answer": "⽤数组元素作为函数实参，其⽤法与⽤普通变量作实参时相同，向形参传递的是数组元素的值⽤数组名作函数实\n参，向形参传递的是数组⾸元素的地址，⽽不是数组全部元素的值。如果形参也是数组名，则形参数组⾸元素与\n实参数组⾸元素具有同⼀地址，两个数组共占同⼀段内存空间。利⽤这⼀特性，可以在调⽤函数期间改变形参数\n组元素的值，从⽽改变实参数组元素的值。这是很有⽤的。要弄清其概念与⽤法。\n第⼋章指针",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "5、顺序存储是一种静态结构、存储密度大，空间利用率低，预分配空间大小难以确定，（缺点）",
    "answer": "链式存储结构的特点？（顺序存储和链式存储的优缺点）",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "54、C 语言中常用的多支选择函数",
    "answer": "常用switch 实现多支选择，如\nswitch（表达式）\n{case 1：语句1\ncase 2：语句2\ndefault：语句n+1}",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "38、结构体和共用体的区别",
    "answer": "共用体与结构体不同，其各成员不是分别占独立的存储单元，而是共享同一段存储空间，因此，各成员的值不会\n同时存在，在某一瞬时，只有最后一次被赋值的成员是有意义的。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "结构体与文件",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "什么是多栈共享技术？",
    "answer": "在一个程序中经常会同时使用多个栈，使用顺序存储结构的栈．空间大小难以估计，这样使得有的栈已出，有的栈还有空闲空间，可以让多\n个栈共享一个足够大的连续向量空间（数组），通过利用栈的动态特性来使其存储空间互相补充，这就是多栈的共享技术，两个栈共享空\n间，主要利用了“栈底位置不变，栈顶位置动态变化”的特性",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__数据结构名词解释.pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "9、说明如何用优先队列来实现栈和队列。",
    "answer": "对每个元素用其插入次序作为其优先级。按此优先级，栈是一个极大化堆，而队列是一个极小化堆。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "栈、队列和数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "48、数组如何进行排序",
    "answer": "对一组数据进行排序的方法很多，如“起泡法”排序。“起泡法”的思路是：先将第1 个数和第2 个数比较，如果第2\n个数比第1 个数小，就将两个数互换，这样，小的数就排到前面了。然后再将第2 个数和第3 个数比较，如果\n第3 个数比第3 个数小，就将两个数互换，这样，第3 个数就是3 个数中最大的了。依此规律，将相邻两个数",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "50、字符串的常⽤处理函数",
    "answer": "gets（字符数组)：从终端输⼊⼀个字符串到字符数组；\nputs（字符数组）：将⼀个字符串（以0 结束的字符序列）输出到终端；\nstrcat(字符数组1，字符数组2)：连接两个字符数组中的字符串，把字符串2 接到字符串1 的后⾯；strcpy（字\n符数组1，字符串2)：将字符串2复制到字符数组1 中去；\nstrcmp(字符串1，字符串2)：⽐较字符串1 和字符串20 如果字符串1=字符串2,则函数值为0；如果字符串1>字\n符串2，则函数值为⼀个正整数；如果字符串1<字符串2，则函数值为⼀个负整数；strlen（字符数组)：测试字\n符串⻓度；",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "函数",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "5.线性表、栈、队的异同点：",
    "answer": "相同点：逻辑结构相同，都是线性的；都可以用顺序存储或链表存储；栈和队列是两种\n特殊的线性表，即受限的线性表（只是对插入、删除运算加以限制）。\n不同点：①运算规则不同：\n线性表为随机存取；\n而栈是只允许在一端进行插入和删除运算，因而是后进先出表LIFO；\n队列是只允许在一端进行插入、另一端进行删除运算，因而是先进先出表FIFO。\n②用途不同，线性表比较通用；堆栈用于函数调用、递归和简化设计等；队列用于离\n散事件模拟、OS 作业调度和简化设计等。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "线性表",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "38.排序",
    "answer": "内部排序：排序期间元素全部存放在内存中。（插⼊，交换，选择，归并，基数）\n外部排序：排序期间元素⽆法同时存放在内存中，必须在排序期间根据要求不停地在内，外存移动。（多路归并）",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "6. 线性表的存储实现",
    "answer": "线性表的定义：具有相同数据类型的n个数据元素的集合\n顺序表：线性表的顺序存储，逻辑位置上相同的元素物理位置上也相同\n链表：线性表的链式存储，逻辑上相同的元素物理位置上不一定相同\n双链表：链表结点存放前后指针，分别指向前驱和后继\n循环链表：尾部结点的指针指向头结点，形成一个环",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "线性表",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "什么是数组？",
    "answer": "数组是有序数据的集合，数组中的每一个元素都属于同一个数据类型。用一个统一的数组名和下\n标来唯一地确定数组中的元素。数组的名字代表数组首元素的地址，而不是代表数组中全部元素的值。\n不能通过数组名引用数组中的全部元素。\n第二十天：",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "（4）空间分配：顺序存储在静态存储分配下需要预先分配足够大的空间，动态存储分配虽然可以扩充空间，但",
    "answer": "是需要移动大量的元素；链式存储空间在需要时申请即可。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "顺序结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "线性结构与非线性结构的特点（或差异）？",
    "answer": "线性结构的特点：是除第一个元素和最后一个元素外，每个数据元素都有唯一的前驱和唯一的后\n继，第一个元素没有前驱，最后一个元素没有后继，关系是一对一的。\n非线性结构的特点是：表示结点间关系的前驱后继不具有唯一性，结点间是一对多或多对多的关\n系。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "数据结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "51、C 语言中字符串是如何存放的?什么时候代表结束？",
    "answer": "字符串是以字符数组形式存放的，为了确定字符串的范围，C 编译系统在每一个字符串的后面加一个作为字符串\n结束标志。0 不是字符串的组成部分，输出字符串时不包括要区分字符数组和字符串，字符串可以放在字符数组\n中，如果宇符串的长度为n，则能存放该字符串的字符数组的长度应≥n+1",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "串",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "43.基数排序",
    "answer": "创建0~9 的⼗个数组，将待排序表的所有元素先按个位进⾏分类，将分类后的元素按索引⼤⼩取出形成新的队列，\n再对队列按⼗位，百位的顺序进⾏分类，重复上述过程，最后形成⼀个有序序列。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "12. 什么是数组、广义表？（大纲没有，但可能会出）",
    "answer": "数组 ： 由类型相同的数据元素构成的有序集合，数组是线性表的推广\n广义表： 是线性表的推广，是由零个或多个单元素或子表所构成的有限序列，又称列表",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "56、使⽤if 实现多⽀选择结构需要注意什么",
    "answer": "内嵌if 也应包括else 部分；把内嵌的if 放在外层的else ⼦句中；加⼤括号，限定范围；程序写成锯⻮形，同⼀\n层次的if 和else 在同⼀列上。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "选择结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "36、构建有效循环体的条件",
    "answer": "需要重复执⾏的操作，记循环体；循环结束的条件",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "19、将线性表构造成二叉排序树的优点：",
    "answer": "①查找过程与顺序结构有序表中的折半查找相似，查找效率高；\n②中序遍历此二叉树，将会得到一个关键字的有序序列（即实现了排序运算）；\n③如果查找不成功，能够方便地将被查元素插入到二叉树的叶子结点上，而且插入或\n删除时只需修改指针而不需移动元素。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "线性表",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "25. 图的遍历方式",
    "answer": "广度优先搜索（BFS）\n类似于层次遍历， 先访问起始顶点， 在访问与其相邻的所有顶点， 再顺序访问与这些\n顶点相邻的顶点， 重复上述\n过程\n深度优先搜索（DFS）\n类似于先序遍历， 从起始顶点出发， 先访问与其相邻的顶点， 再访问与该顶点相邻且\n未被访问过的顶点， 重复上述步骤， 当与其相邻的所有顶点都被访问过， 依次回退曾\n经访问过的顶点， 若某个顶点还有与其相邻且未被访问过的顶点， 则从该点开始重复上",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "图",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "串和线性表的区别？",
    "answer": "蜗牛和牛\n专栏\n关注\n58\n5\n258\n串的逻辑结构与线性表极为相似，区别仅在于串的数据对象约束为字符集，然而串的操作与线性表有很大的差别，在线性表基本操作中，大\n多以单个元素作为操作对象；而在串的基木操作中通常以“串的整体”作为操作对象",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__数据结构名词解释.pdf.txt）",
    "ch": "线性表",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "46.提⾼外部排序算法的效率",
    "answer": "由于待排⽂件⽆法全部放⼊内存，所以排序期间必须要频繁的进⾏内外存之间数据的交换，这会耗费⼤量的时间。\n所以可以通过增加归并路数来减少归并趟数，进⽽减少I/O 次数。⽽增加归并路数⼜会增加内部排序的时间，所\n以引⼊了败者树。\n增加初始归并段个数，并且不受内存空间的限制，引⼊了置换-选择算法。\n⽂件经过置换-选择算法之后得到的是⻓度不同的初始归并段，如何组织⻓度不等的出使归并段的归并顺序，使\n得I/O 次数最少，就引⼊了最佳归并树。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "40.交换排序",
    "answer": "冒泡排序：从前到后（从后往前）依次两两⽐较相邻元素的值，若为逆序，就交换元素，每⼀趟排序完成之后，\n就有⼀个元素被放在最终位置上，重复上述步骤，当⼀趟排序不发⽣任何元素的交换为⽌。\n快速排序：每次从待排序列中选择⼀个元素作为枢轴（通常是序列的⾸元素），把⽐枢轴⼩的元素放前⾯，⽐枢\n轴⼤的元素放后⾯，最后确定枢轴元素的最终位置并将枢轴放⼊，再对枢轴前后得到的⼦序列再重复上述步骤，\n直到每部分只有⼀个元素或为空为⽌，则所有元素放在最终位置上。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "排序",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "51、C 语⾔中字符串是如何存放的?什么时候代表结束？",
    "answer": "字符串是以字符数组形式存放的，为了确定字符串的范围，C 编译系统在每⼀个字符串的后⾯加⼀个作为字符串\n结束标志。0 不是字符串的组成部分，输出字符串时不包括要区分字符数组和字符串，字符串可以放在字符数组\n中，如果宇符串的⻓度为n，则能存放该字符串的字符数组的⻓度应≥n+1",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "串",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "3. 字符常量和字符串常量的区别",
    "answer": "字符型常量是用单引号括起来的一个字符，字符串常量是用一对双引号括起来的0个或者多个\n字符组成的序列\n字符型数据存储ASCLL码\n字符串常量是将字符存储，并自动在其末尾加上‘/0’作为字符传结束的标志",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题重点总结2（优先）.pdf.txt）",
    "ch": "串",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "（4）图结构或网状结构",
    "answer": "数据元素之间存在多对多的关系。例如，多位同学之间的朋友关系，任何两位同学都可以是\n朋友，从而构成图形结构或网状结构。\n其中树结构和图结构都属于非线性结构。\n构衡量算法的四个标准：正确性、可读性、健壮性、高效性\n第四天：\n顺序存储结构的特点？（顺序存储和链式存储的优缺点）",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "图",
    "fromLib": true
  },
  {
    "type": "apply",
    "q": "56、使用if 实现多支选择结构需要注意什么",
    "answer": "内嵌if 也应包括else 部分；把内嵌的if 放在外层的else 子句中；加大括号，限定范围；程序写成锯齿形，同一\n层次的if 和else 在同一列上。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "选择结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "39、什么是图？",
    "answer": "图(Graph)是由顶点的有穷⾮空集合和顶点之间边的集合组成，通常表示为：G(V，E），其中，G 表示⼀个图，V\n是图G 中顶点的集合，E 是图G 中边的集合。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "图",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "19.图的名词解释",
    "answer": "连通图：在⽆向图中如果两顶点之间有路径存在，就称这两个顶点是连通的。如果⽆向图中任意两个顶点是连通\n的，就称图为连通图。\n极⼤连通⼦图（连通分量）：该连通⼦图包含所有的边。\n极⼩连通⼦图：在保证连通的情况边最少的⼦图。\n强连通图：在有向图中，如果顶点m 到顶点n 有路径存在且n 到m 也有路径存在，就称这两个顶点是强连通的。\n图中任何两个顶点都是强连通的，该图就是强连通图。\n强连通分量：有向图中的极⼤强连通⼦图为强连通分量。\n⽣成树：连通图中包含所有顶点的极⼩连通⼦图。\n⽹：在图中每条边都可以标上具有某个意义的数值，称为该边的权值。边上带权值得图为⽹，",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "图",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "14、什么是数组，为什么要⽤数组",
    "answer": "数组是有序数据的集合。数组中的每⼀个元素都属于同⼀个数据类型。⽤⼀个统⼀的\n数组名和下标来唯⼀地确定数组中的元素。这样就把具有同⼀属性的若⼲个数据组织\n成⼀个整体，它们再也不是互相孤⽴⽆关的单个数据，⽽是互相关联的，便于统⼀处\n理。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "32、循环的分类",
    "answer": "有两种循环：⼀种是⽆休⽌的循环，如地球围绕太阳旋转，永不终⽌；每⼀天24 ⼩时，周⽽复始。另⼀种是有\n终⽌的循环，达到⼀定条件循环就结束了，如统计完第50 名学⽣成绩后就不再继续了。计算机程序只处理有条\n件的循环，算法的特性是有效性、确定性和有穷性，如果程序永远不结束，是不正常的。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "35、提前结束循环的两种⽅法",
    "answer": "⽤break 提前结束整个循环，⽤continue 提前结束本次循环",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "35、什么是结构体",
    "answer": "C 语⾔允许⽤户⾃⼰建⽴由不同类型数据组成的组合型的数据结构，它称为结构体。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "结构体与文件",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "46、什么是数组，为什么要用数组",
    "answer": "数组是有序数据的集合。数组中的每一个元素都属于同一个数据类型。用一个统一的数组名和下标来唯一地确定\n数组中的元素。这样就把具有同一属性的若干个数据组织成一个整体，它们再也不是互相孤立无关的单个数据，\n而是互相关联的，便于统一处理。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__c、数据结构简答题.pdf.txt）",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "15、C 语⾔中字符串是如何存放的?什么时候代表结束？",
    "answer": "字符串是以字符数组形式存放的，为了确定字符串的范围，C 编译系统在每⼀个字符\n串的后⾯加⼀个作为字符串结束标志。0 不是字符串的组成部分，输出字符串时不包\n括要区分字符数组和字符串，字符串可以放在字符数组中，如果宇符串的⻓度为n，\n则能存放该字符串的字符数组的⻓度应≥n+1",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "串",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "34、简述while 循环和do..while 循环的区别",
    "answer": "while 是先进⾏判断，符合条件再进⼊循环体；do..while 是先做⼀次循环体后再进⾏判断",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "循环结构",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "简述线性表栈，队列的区别和联系",
    "answer": "相同点：都是线性结构，都是逻辑结构的概念，都可以用顺序存储或链式存储，栈和队列是两种\n特殊的线性表，即受限的线性表，只对插入和删除运算加以限制。\n不同点：运算规则不同，栈限定仅在表尾端进行插入、删除运算，因而是后进先出表，队列只允\n许在一端进行插入，而在另一端进行删除运算，因而是先进先出表。\n第十七天：",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言和数据结构简答题(1).pdf.txt）",
    "ch": "线性表",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "9、字符常量与字符串常量有什么区别？",
    "answer": "字符常量就是⼀个字符，⽤单引号括起来，占⼀个字节；⽽字符串常量是由若⼲个\n字符组合⽽成，⽤双引号括起来，存储时⾃动在后⾯加“\\0”，即使同样是⼀个字符，\n字符串常量后⾯还要加⼀个“\\0”。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__简答题__简答题押题.pdf.txt）",
    "ch": "串",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "38、结构体和共⽤体的区别",
    "answer": "共⽤体与结构体不同，其各成员不是分别占独⽴的存储单元，⽽是共享同⼀段存储空间，因此，各成员的值不会\n同时存在，在某⼀瞬时，只有最后⼀次被赋值的成员是有意义的。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "结构体与文件",
    "fromLib": true
  },
  {
    "type": "essay",
    "q": "字符常量与字符串常量有什么区别？",
    "answer": "字符常量就是⼀个字符，⽤单引号括起来，占⼀个字节；⽽字符串常量是由若⼲个字符组合⽽成，⽤双引号括起\n来，存储时⾃动在后⾯加“\\0”，即使同样是⼀个字符，字符串常量后⾯还要加⼀个“\\0”。",
    "explain": "（来自资料库简答题参考资料：4_大题简答题__C语言、数据结构简答题(1).pdf.txt）",
    "ch": "串",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "将二进制数 101101 转换为十进制数，结果是多少？",
    "answer": "45\n（32+0+8+4+0+1 = 45）",
    "explain": "二进制转十进制：按权展开求和。",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "将十进制数 53 转换为二进制数。",
    "answer": "110101\n（53÷2=26余1, 26÷2=13余0, 13÷2=6余1, 6÷2=3余0, 3÷2=1余1, 1÷2=0余1；倒序得110101）",
    "explain": "除2取余，倒序排列。",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "写出十进制数 -25 的 8 位二进制补码。",
    "answer": "11100111\n（25原码00011001 → 反码11100110 → 补码11100111）",
    "explain": "负数补码 = 反码 + 1。",
    "ch": "数据的存储与运算",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "C语言中，设 int a=5, b=3; 执行 a += b; 后 a 和 b 的值分别是多少？",
    "answer": "a = 8, b = 3\n（复合赋值 a += b 等价于 a = a + b）",
    "explain": "+= 为复合赋值运算符。",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "求表达式 3 + 5 * 2 % 3 的值（按C语言运算符优先级）。",
    "answer": "4\n（先 * ：5*2=10；再 % ：10%3=1；最后 + ：3+1=4）",
    "explain": "*、% 优先级高于 +，且 *、% 同级左结合。",
    "ch": "C语言",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "已知 int a[5] = {1,3,5,7,9}; 求 a[2] + a[4] 的值。",
    "answer": "14\n（a[2]=5, a[4]=9, 5+9=14）",
    "explain": "C数组下标从0开始。",
    "ch": "数组",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "已知二叉树前序遍历为 ABDECF，中序遍历为 DBEAFC，写出其后序遍历序列。",
    "answer": "DEBFCA\n（由前序定根A，中序分左DBE/右FC；递归可得结构）",
    "explain": "前序：根左右；中序：左根右；后序：左右根。",
    "ch": "树与二叉树",
    "fromLib": true
  },
  {
    "type": "calc",
    "q": "对序列 {5, 3, 8, 1, 2} 进行一趟冒泡排序（升序）后，序列变为？",
    "answer": "{3, 5, 1, 2, 8}\n（每轮把最大元素“冒泡”到末尾）",
    "explain": "冒泡排序每趟比较相邻元素并交换逆序对。",
    "ch": "排序",
    "fromLib": true
  }
],
 "materials": {
  "真题": [
   "广东省2025年普通专升本《计算机基础与程序设计》真题.pdf",
   "24年计算机真题解析1/2.pdf",
   "计算机真题解析1/2.pdf",
   "2023部分真题解析【修正】.pdf"
  ],
  "模拟卷": [
   "26强哥冲刺卷(12-15)",
   "25强哥模拟卷",
   "24强哥模拟卷",
   "测试卷/押题卷"
  ],
  "选择题专项": [
   "26库课2000题+答案",
   "25库课2000题+答案",
   "26库课小红本课后习题",
   "刷题宝C语言(重点笔记)",
   "刷题宝数据结构(重点笔记)",
   "C语言基础练习题"
  ],
  "简答题": [
"4_大题简答题/C语言、数据结构简答题.pdf",
"4_大题简答题/C语言和数据结构简答题(1).pdf",
"4_大题简答题/C语言、数据结构简答题重点总结2（优先）.pdf",
"4_大题简答题/c、数据结构简答题.pdf",
"4_大题简答题/数据结构核心简答题.pdf",
"4_大题简答题/计算机120简答题（优先）.docx",
"4_大题简答题/计算机简答题 （优先）.docx",
"4_大题简答题/简答题/孟涛简答题复习要点.pdf",
"4_大题简答题/简答题/简答题押题.pdf"
],
  "知识点总结": [
   "C语言知识点总结(考前突击版)",
   "C语言程序设计知识点总结",
   "数据结构知识点总结—精华版",
   "计算机考点汇编",
   "C语言关键词/命名/指令表"
  ]
 },
 "examInfo": {
  "name": "广东省普通专升本《计算机基础与程序设计》",
  "score": 200,
  "time": "150分钟",
  "typeScore": {
   "单选": "20×3=60",
   "判断": "10×2=20",
   "填空": "5×4=20",
   "简答": "4×10=40",
   "计算": "3×10=30",
   "应用": "3×10=30"
  },
  "refBooks": [
   "谭浩强《C语言程序设计》第5版",
   "严蔚敏、吴伟民《数据结构》C语言版第2版"
  ],
  "zeroBasePlan": [
   "阶段1(第1-2月)：C语言1-10章顺序过，死磕数组/函数/指针/结构体，每章亲手写代码跑通",
   "阶段2(第3-4月)：数据结构，重点线性表/树与二叉树/排序/查找，动手画遍历、写排序",
   "阶段3(第5-6月)：刷真题+模拟，客观题冲满分，简答/计算/应用冲刺，错题回炉"
  ]
 }
};
