#各种模式
“noraml "
insert i
replace R
visaul v
line shift v
block ctrl v
command :
#快捷键 ##基本语法
1.:w 保存
2.:q 退出当前标签页
:qa 退出全部标签页
:sp 打开一个标签页
hjkl 左下上右移动光标 前面加数字代表执行几次
缓冲区
w 向前移动一个单词
b向后
e 移动到单词末尾
0 整行移动
ctrl d and ctrl u 向上向下移动
g 移到最下面
gg 上面
l 可视范围内最下面
m 中间
h 最上面
f-~ 找到这一行~字母
:o 再开一行，并打开insert模式
:d 配合移动键盘 删东西
d 删除，要搭配范围，dd删整行，dw 删除一个单词，d$删到行尾，本质是剪切
u 撤销行为
c 改变
cc dd
x 删除光标所在字母
ctrl r 重做
y 复制
yy 复制一行
p 粘贴
此时就要理解可视化模式(v)它可以框选出一部分进行复制粘贴
修饰符：A around 
I inside
两者用来处理括号，前者包括括号，后者不包括
/    搜索符号 在里面写入单词就可以找到第一个符合你要求的单词
$ 到末尾
.   复制你上一个动作
ci()   修改该括号里面的内容
#d与c的差别
d是删除后进行其他正常操作，而c是删除后进入插入模式进行修改
所以 dwi = cw
#补充
- `:q` 退出（关闭窗口）
- `:w` 保存（“写入”）
- `:wq` 保存并退出
- `:e {文件名}` 打开文件进行编辑
- `:ls` 显示已打开的缓冲区
- `:help {topic}` 打开帮助
    - `:help :w` 打开 `:w` 命令的帮助
    - `:help w` 打开 `w` 移动的帮助
    #移动
    - 基本移动：`hjkl`（左，下，上，右）
- 单词：`w`（下一个单词），`b`（单词开头），`e`（单词结尾）
- 行: `0` (行首), `^` (第一个非空白字符), `$` (行尾)
- 屏幕：`H`（屏幕顶部），`M`（屏幕中间），`L`（屏幕底部）
- 滚动：`Ctrl-u`（向上），`Ctrl-d`（向下）
- 文件：`gg`（文件开头），`G`（文件结尾）
- 行号：`:{number}<CR>` 或 `{number}G` (行 {number})
- 杂项：`%` (对应项)
- 寻找：`f{character}`，`t{character}`，`F{character}`，`T{character}`
    - 在当前行中查找/向前/向后移动 {字符}
    - /用于导航比赛`,` / `;` 用于导航匹配项
- 搜索：`/{regex}`，`n`/`N`用于浏览比赛

## 选择
视觉模式：

- 视觉的：`v`
- 视觉线：`V`
- 视觉障碍：`Ctrl-v`

可以使用移动键进行选择。

#编辑
- `i`进入插入模式
    - 但对于编辑/删除文本，我想使用比退格键更高级的按键。
- `o` / `O` 在下方/上方插入行
- `d{motion}` 删除 {motion}
    - 例如 `dw` 是删除单词，`d$` 是删除到行尾，`d0` 是删除到行首
- `c{motion}` 修改 {motion}
    - 例如 `cw` 是修改单词
    - 类似于 `d{motion}` 后跟 `i`
- `x` 删除字符（等于 `dl`）
- `s` 替换字符（等于 `cl`）
- 可视模式 + 操作
    - 选择文本，按 `d` 删除它或按 `c` 修改它
- 按 `u` 撤销，按 `<C-r>` 重做
- 按 `y` 复制/“粘贴”（其他命令如 `d` 也具有复制功能）
- `p` 用于粘贴
- 还有更多要学习的内容：例如 `~` 可以翻转字符的大小写

#配置文件
`~/.vimrc`

# 在其他程序中使用 Vim 模式

许多工具都支持 Vim 模拟。模拟效果参差不齐，从良好到优秀不等；根据工具的不同，有些可能不支持 Vim 的一些高级功能，但大多数都能很好地满足基本需求。

## 壳

如果您是 Bash 用户，请使用 `--bash-editor-user` `set -o vi`。如果您使用 Zsh，请使用 `--bash-editor- user`。`bindkey -v`对于 Fish， 请使用 `--fish `fish_vi_key_bindings`-editor-user`。此外，无论您使用哪个 shell，都可以使用 ` --fish-editor-user` `export EDITOR=vim`。这是一个环境变量，用于决定程序启动编辑器时使用哪个编辑器。例如，`fish- editor- `git` user` 将使用此编辑器来显示提交信息。

## 阅读线

许多程序都使用[GNU Readline](https://tiswww.case.edu/php/chet/readline/rltop.html)库作为其命令行界面。Readline 也支持（基本的）Vim 模拟，可以通过在`~/.inputrc`文件中添加以下行来启用：

```
set editing-mode vi
```

例如，通过这种设置，Python REPL 将支持 Vim 绑定。

## 其他的

甚至还有适用于网页 [浏览器](http://vim.wikia.com/wiki/Vim_key_bindings_for_web_browsers)的 Vim 快捷键扩展——一些比较流行的包括 Google Chrome 的[Vimium和 Firefox 的](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en)[Tridactyl](https://github.com/tridactyl/tridactyl)。你甚至可以在[Jupyter Notebook](https://github.com/jupyterlab-contrib/jupyterlab-vim)中使用 Vim 快捷键。这里列出了一长串[支持](https://reversed.top/2016-08-13/big-list-of-vim-like-software)类似 Vim 快捷键的软件。

# 高级 Vim

这里有一些例子可以向您展示编辑器的强大功能。我们不可能教会您所有这些技巧，但您会在实践中慢慢掌握。一个很好的经验法则是：每当您使用编辑器时，如果觉得“肯定有更好的方法”，那很可能真的有：上网搜索一下。

## 搜索和替换

`:s`（替换）命令（[文档](http://vim.wikia.com/wiki/Search_and_replace)）。

- `%s/foo/bar/g`
    - 文件中的全局变量 foo 替换为 bar
- `%s/\[.*\](\(.*\))/\1/g`
    - 将命名 Markdown 链接替换为纯 URL。

## 多窗口

- `:sp`/`:vsp`分割窗口
- 可以对同一个缓冲区进行多次查看。

## 宏

- `q{character}`开始在寄存器中录制宏`{character}`
- `q`停止录制
- `@{character}`重放宏
- 宏执行因错误而停止。
- `{number}@{character}`执行宏 {number} 次
- 宏可以是递归的
    - 首先清除宏`q{character}q`
    - 录制宏，并`@{character}`递归调用该宏（在录制完成之前不会执行任何操作）。
- 示例：将 XML 转换为 JSON（[文件](https://missing.csail.mit.edu/2020/files/example-data.xml)）
    - 包含键为“name”/“email”的对象数组
    - 使用Python程序？
    - 使用 sed / 正则表达式
        - `g/people/d`
        - `%s/<person>/{/g`
        - `%s/<name>\(.*\)<\/name>/"name": "\1",/g`
        - …
    - Vim 命令/宏
        - `Gdd`删除`ggdd`第一行和最后一行
        - 用于格式化单个元素的宏（寄存器`e`）
            - 排队`<name>`
            - `qe^r"f>s": "<ESC>f<C"<ESC>q`
        - 用于格式化人员的宏
            - 排队`<person>`
            - `qpS{<ESC>j@eA,<ESC>j@ejS},<ESC>q`
        - 用于格式化某人并跳转到下一个人的宏
            - 排队`<person>`
            - `qq@pjq`
        - 执行宏直到文件末尾
            - `999@q`
        - 手动删除最后一个分隔符`,`并添加`[`分隔`]`符

# 资源

- `vimtutor`这是一个随 Vim 一起安装的教程——如果 Vim 已安装，您应该能够`vimtutor`从 shell运行它。
- [Vim Adventures](https://vim-adventures.com/)是一款学习 Vim 的游戏。
- [Vim Tips Wiki](http://vim.wikia.com/wiki/Vim_Tips_Wiki)
- [Vim 圣诞倒计时日历](https://vimways.org/2019/)包含各种 Vim 小技巧
- [Vim Golf](http://www.vimgolf.com/)是[一种代码高尔夫游戏](https://en.wikipedia.org/wiki/Code_golf)，只不过使用的编程语言是 Vim 的用户界面。
- [Vi/Vim Stack Exchange](https://vi.stackexchange.com/)
- [Vim 屏幕录像](http://vimcasts.org/)
- [实用 Vim](https://pragprog.com/titles/dnvim2/)（书籍）

# 练习

1. 已完成。注意：在[80x24](https://en.wikipedia.org/wiki/VT100)（80 列 x 24 行）的终端窗口`vimtutor`中显示效果最佳 。[](https://en.wikipedia.org/wiki/VT100)
2. 下载我们的[基本 vimrc](https://missing.csail.mit.edu/2020/files/vimrc)文件并保存到指定位置`~/.vimrc`。通读这份注释详尽的文件（使用 Vim！），观察 Vim 在新配置下的外观和行为有何细微变化。
3. 安装并配置插件： [ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim)。
    1. 使用以下命令创建插件目录`mkdir -p ~/.vim/pack/vendor/start`
    2. 下载插件：`cd ~/.vim/pack/vendor/start; git clone https://github.com/ctrlpvim/ctrlp.vim`
    3. 请阅读 插件的[文档](https://github.com/ctrlpvim/ctrlp.vim/blob/master/readme.md) 。尝试使用 CtrlP 来定位文件，方法是导航到项目目录，打开 Vim，然后使用 Vim 命令行启动 `:CtrlP`。
    4. 通过向你的配置中添加[设置](https://github.com/ctrlpvim/ctrlp.vim/blob/master/readme.md#basic-options)来自定义 CtrlP， `~/.vimrc`以便按 Ctrl-P 打开 CtrlP。
4. 要练习使用 Vim，请在自己的电脑上重新完成[课堂演示。](https://missing.csail.mit.edu/2020/editors/#demo)
5. 接下来一个月，请使用 Vim 进行_所有_文本编辑。如果遇到效率低下或感觉“肯定有更好的方法”的情况，请尝试在 Google 上搜索，很可能确实有。如果遇到问题，欢迎在办公时间前来咨询或给我们发送电子邮件。
6. 配置其他工具以使用 Vim 绑定（请参阅上面的说明）。
7. 进一步自定义设置`~/.vimrc`并安装更多插件。
8. （进阶）使用 Vim 宏将 XML 转换为 JSON（[示例文件](https://missing.csail.mit.edu/2020/files/example-data.xml)）。尝试自行完成， 如果遇到问题，可以参考上面的[宏部分。](https://missing.csail.mit.edu/2020/editors/#macros)