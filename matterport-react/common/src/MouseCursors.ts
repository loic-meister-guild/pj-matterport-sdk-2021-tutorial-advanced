
export enum Cursor {
    NONE = 'none',
    DEFAULT = 'default',
    MOVE = 'move',
    MOVE_LF = 'col-resize',
    MOVE_UD = 'row-resize',
    XHAIR = 'crosshair',
    PLUS = 'cell',
    QUESTION = 'help',
    NOPE = 'not-allowed',
    FINGER = 'pointer',
    TEXT = 'text',
    TEXT_VERT = 'vertical-text',
    ZOOM_IN = 'zoom-in',
    ZOOM_OUT = 'zoom-in',
    GRAB = 'grab',
    GRABBING = 'grabbing',
    // Arrows pointing in one direction
    ARROW_R = 'e-resize',
    ARROW_L = 'w-resize',
    ARROW_U = 'n-resize',
    ARROW_D = 's-resize',
    ARROW_UR = 'ne-resize',
    ARROW_UL = 'nw-resize',
    ARROW_DR = 'se-resize',
    ARROW_DL = 'sw-resize',
    // Dual-headed arrows
    ARROW_LR = 'ew-resize',
    ARROW_UD = 'ns-resize',
    ARROW_URDL = 'nesw-resize',
    ARROW_ULDR = 'nwse-resize',
    // custom
    DROPPER = 'mp-dropper',
  }
  