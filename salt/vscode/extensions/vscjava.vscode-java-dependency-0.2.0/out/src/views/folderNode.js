"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const jdtls_1 = require("../java/jdtls");
const nodeData_1 = require("../java/nodeData");
const dataNode_1 = require("./dataNode");
const explorerNode_1 = require("./explorerNode");
const fileNode_1 = require("./fileNode");
class FolderNode extends dataNode_1.DataNode {
    constructor(nodeData, parent, _project, _rootNode) {
        super(nodeData, parent);
        this._project = _project;
        this._rootNode = _rootNode;
    }
    loadData() {
        return jdtls_1.Jdtls.getPackageData({ kind: nodeData_1.NodeKind.Folder, projectUri: this._project.uri, path: this.path, rootPath: this._rootNode.path });
    }
    createChildNodeList() {
        const result = [];
        if (this.nodeData.children && this.nodeData.children.length) {
            this.nodeData.children.forEach((nodeData) => {
                if (nodeData.kind === nodeData_1.NodeKind.File) {
                    result.push(new fileNode_1.FileNode(nodeData, this));
                }
                else if (nodeData.kind === nodeData_1.NodeKind.Folder) {
                    result.push(new FolderNode(nodeData, this, this._project, this._rootNode));
                }
            });
        }
        return result;
    }
    get iconPath() {
        return explorerNode_1.ExplorerNode.resolveIconPath("folder");
    }
}
exports.FolderNode = FolderNode;
//# sourceMappingURL=folderNode.js.map