# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

一套给编程 Agent 的工程护栏基线。5 个小技能，十分钟就能读完，也可以照你们团队的做法随手改写。

[English](README.md) | 中文

## 为什么需要这个？

有能力的 Agent 不需要被教怎么写代码，它需要知道哪些约定是你们团队的。

这些约定不说清楚，就会在每个会话里被重新推导一遍，而且推导结果还会漂移。如果一个团队要求「同一件事只有一个归宿」、要求「加依赖必须先问」、要求「提交信息读起来像这个仓库的历史」，那它得有个地方把这些写下来，让 Agent 在真正需要的时候能看见。

Beyond Code 就是这个地方。5 条护栏，每条是一个规范，不是一套流程：

1. **scope-guard**：动手前先说清这次**不做什么**。
2. **implementation-bounds**：圈定目标文件，到边界就停。
3. **root-cause-debugging**：在缺陷所在的地方修，不在它暴露的地方修。
4. **code-integrity-audit**：说完成了，就得拿出证明它的输出。
5. **canonical-docs**：一事一归宿，用现在时，锚在真实类型上。

它们刻意就是纯 Markdown：没有要你接受的目录结构，没有跟踪表，没有要跑的流程。像改其他配置一样改它们：不同意的规则删掉，团队反复强调的加进去，剩下的交给 Agent 自己发挥。

## 5 个核心技能

| 技能 | 什么时候用 |
| :--- | :--- |
| **[`scope-guard`](skills/scope-guard/SKILL.md)** | 梳理需求时，或者这个需求比它该改的东西大得多 |
| **[`implementation-bounds`](skills/implementation-bounds/SKILL.md)** | 动手写代码前，或者改动已经越出圈定的文件范围 |
| **[`root-cause-debugging`](skills/root-cause-debugging/SKILL.md)** | 测试挂了、代码报错、结果不对，或者同一个 Bug 反复出现 |
| **[`code-integrity-audit`](skills/code-integrity-audit/SKILL.md)** | 准备说做完了、准备提交、或者准备提 PR 时 |
| **[`canonical-docs`](skills/canonical-docs/SKILL.md)** | 编写或审查 `docs/`，或者文档和代码已经对不上了 |

## 安装

安装所有技能到你的 Agent（Claude Code, Codex, DSH, Cursor 等）：

```bash
npx skills add Celec7/beyond-code
```

也可以按需挑选单个技能使用。

## 日常怎么用？

每个技能都是独立的，平时不需要你特意背诵命令，你可以随时唤起，也可以让 AI 自主触发：

- **准备做新功能时**：让它用 `scope-guard` 先对齐这次**不做什么**，以及有哪些关键技术选择需要你定夺；
- **AI 动手改代码时**：用 `implementation-bounds` 限制它只动这几个文件，防止它把整个代码库改花了；
- **代码跑崩了的时候**：提醒它用 `root-cause-debugging` 去查数据来源，别在报错行随手糊一个 `?.` 应付差事；
- **准备交差前**：让它用 `code-integrity-audit` 拿着放大镜查一遍自己写的 diff，确保没留未实现的 TODO，测试都是真实跑通的；
- **沉淀或更新系统架构时**：让它用 `canonical-docs` 维护 `docs/`，确保写下的每一句都是当前代码库真实的客观契约，绝不混入临时工单和陈旧废话。

## 开源协议

[MIT](LICENSE)
