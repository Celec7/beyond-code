# Example documentation tree

An example role-to-path mapping for a medium project that adopted the optional [documentation tier taxonomy](../references/documentation-tiers.md). Adjust the paths to the project; keep the roles.

```text
AGENTS.md                      # standing agent instructions
docs/
  README.md                    # navigation
  architecture.md              # ordered map of composition and seams
  subsystems/<subsystem>.md    # types, semantics, public API
  cookbook/<how-to>.md         # step-by-step with verification
  postmortem/0001-<topic>.md   # incident story
  agents/notes/
    proposed/<class>/<date>-<topic>.md
    implemented/<class>/<date>-<topic>.md
    rejected/<class>/<date>-<topic>.md
  user/<guide>.md              # product-facing tasks
  <module>/README.md           # per-module contract
```

Do not scaffold empty files. Create a path only when a real document needs it, and record the mapping where contributors will look.
