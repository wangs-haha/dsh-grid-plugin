window.__ModuleLoader__.load({
  id: '@local/dsh-grid',
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
"use strict";var ut=Object.defineProperty;var Tn=Object.getOwnPropertyDescriptor;var En=Object.getOwnPropertyNames;var In=Object.prototype.hasOwnProperty;var Rn=(t,e)=>{for(var n in e)ut(t,n,{get:e[n],enumerable:!0})},zn=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of En(e))!In.call(t,o)&&o!==n&&ut(t,o,{get:()=>e[o],enumerable:!(a=Tn(e,o))||a.enumerable});return t};var Mn=t=>zn(ut({},"__esModule",{value:!0}),t);var Xn={};Rn(Xn,{default:()=>Un});module.exports=Mn(Xn);var Pn={meta:{title:"Grid",description:"Database workbench: connections with groups, colours and TLS modes, a schema browser, an editable data grid, a SQL console with completion, and saved queries \u2014 plus read-only database context for the agent."},panel:"Grid",connections:"Connections",tabGeneral:"General",tabSsh:"SSH Tunnel",tabSsl:"SSL / TLS",workspaces:"Workspaces",noWorkspaces:"No workspace is registered in this profile yet.",databases:"Databases",newConnection:"New connection",newQuery:"New query",tables:"Tables",views:"Views",functions:"Functions",users:"Users",queries:"Queries",overview:"Overview",connect:"Connect",disconnect:"Disconnect",test:"Test Connection",edit:"Edit",delete:"Delete",refresh:"Refresh",save:"Save",cancel:"Cancel",close:"Close",closeThisTab:"Close",closeAllTabs:"Close All",closeOtherTabs:"Close Others",closeTabsToRight:"Close to the Right",closeTabsToLeft:"Close to the Left",optional:"optional",required:"required",confirm:"Confirm",apply:"Apply",clear:"Clear",search:"Search\u2026",loading:"Loading\u2026",error:"Error",name:"Name",type:"Type",comment:"Comment",rows:"Rows",estimatedTotal:"The engine estimated this row count; Refresh asks for an exact count.",size:"Size",total:"Total",selectConnection:"Select a connection on the left to begin.",selectDatabase:"Select a database to list its objects.",emptyTables:"No tables or views in this database.",emptyTable:"This table is empty.",emptyResult:"The query returned no rows.",emptyObjects:"Nothing here yet.",data:"Data",structure:"Structure",columns:"Columns",indexes:"Indexes",ddl:"DDL",noIndexes:"No indexes.",nullable:"Nullable",default:"Default",primaryKey:"PK",insertRow:"Insert row",editRow:"Edit row",rowSaved:"Row saved",rowInserted:"Row inserted",insertRowFailed:"The row could not be inserted with its defaults.",deleteRow:"Delete row",confirmDelete:"Delete this row?",confirmDeleteConnection:"Delete this connection? Its saved password is removed too.",confirmDeleteKey:"Delete this key?",noPrimaryKey:"This table has no primary key, so rows cannot be located safely. Editing is disabled.",cellSaved:"Saved",deleted:"Deleted",saved:"Saved",copied:"Copied",page:"Page {page} of {pages}",pageSize:"Rows per page",prev:"Previous",next:"Next",selection:"Selection {n}",sum:"Sum",avg:"Avg",count:"Count",exportCsv:"Export CSV",exportJson:"Export JSON",exportInsert:"Export INSERT statements",exportMarkdown:"Export Markdown table",exportAs:"Export",importCsv:"Import CSV",importDone:"Imported {n} row(s)",importEmpty:"That file has no rows.",importNoColumns:"Open the table first so its column names are known.",importUnknownColumns:"The file has columns this table does not: {cols}",importFailed:"Imported {n} row(s), then stopped: {error}",exportTruncated:"Export limited to {n} rows",filter:"Filter",filterBuilder:"Filter builder",rawWhere:"Raw WHERE",addCondition:"Add condition",matchAll:"Match all",matchAny:"Match any",columnChooser:"Columns",showAll:"Show all",resetWidths:"Reset widths",run:"Run",cancelQuery:"Cancel",queryCancelled:"Cancelled",cancelUnsupported:"This engine cannot cancel a running statement.",runHint:"Ctrl/Cmd + Enter to run",explain:"Explain",beautify:"Beautify",history:"History",noHistory:"No queries yet.",result:"Result {n}",statementCount:"{n} statement(s)",queryOk:"{n} row(s) in {ms} ms",resultTruncated:"The result was capped: only the first 2 000 rows are shown.",queryFailed:"Failed after {ms} ms",affected:"{n} row(s) affected",noStatements:"Nothing to run.",completionHint:"Ctrl + Space for completion",readOnlyHint:"Read-only statements only",redisKeys:"Keys",redisPattern:"Pattern",redisType:"Type",scanMore:"Scan more",ttl:"TTL",noTtl:"no expiry",keyValue:"Value",command:"Command",commandHint:"e.g. GET user:1",reply:"Reply",deleteKey:"Delete key",newKey:"New key",setTtl:"Set TTL",rename:"Rename",editValue:"Edit value",saveQuery:"Save query",queryName:"Query name",querySaved:"Query saved",noQueries:"No saved queries yet. Save one from the SQL console, or ask the agent to.",openInEditor:"Open in editor",runQuery:"Run",source:"Source",bindProject:"Bind to this project",unbindProject:"Unbind project",projectBound:"This conversation can read {name} ({database}) without asking.",projectUnbound:"Not bound to this workspace. The agent has to ask which connection to use.",readOnlyForAgent:"Agent access is read-only",agentHint:"The agent can list, inspect and query these connections with grid_* tools, and save queries for you.",functionKind:"Function",procedureKind:"Procedure",returnType:"Returns",language:"Language",definition:"Definition",noRoutines:"No functions or procedures.",accountName:"User",accountHost:"Host",accountPlugin:"Plugin",accountLocked:"Locked",accountPrivileged:"Privileged",noAccounts:"No accounts are visible to this connection.",driverMissing:"The {engine} driver is not installed. Run `pnpm add {pkg}` in the plugin directory.",engineUnavailable:"Unavailable",testOk:"Connection works \xB7 {version} \xB7 {ms} ms",testFailed:"Connection failed: {error}",passwordKeep:"Leave blank to keep the saved password",secretKeep:"Saved credential exists. Leave blank to keep it; use Clear credential to remove it.",secretClear:"Clear credential",secretUndoClear:"Undo clear",secretClearPending:"This credential will be cleared on save. Typing a replacement cancels the clear.",sshSection:"SSH tunnel",sshEnable:"Connect through SSH",sshSingleHopHint:"Single jump host only. All SSH server fields and a pinned fingerprint are required.",sshHost:"SSH host",sshPort:"SSH port",sshUsername:"SSH user",sshAuthType:"SSH authentication",sshAuthPassword:"Password",sshAuthPrivateKey:"Private key",sshHostFingerprint:"Pinned SSH host fingerprint",sshFingerprintHint:"Obtain the SHA256:\u2026 host fingerprint from your administrator through a trusted channel. It is never discovered or trusted automatically.",sshPassword:"SSH password",sshPrivateKey:"SSH private key",sshPrivateKeyHint:"Paste the complete private key. Saved private keys are never read back; no host file path is read.",sshPassphrase:"Private key passphrase (optional)",sshDatabaseHostHint:"Database host is resolved from the SSH jump host. 127.0.0.1 means the jump host itself.",sshSecurityHint:"SSH does not replace database TLS. Keep database TLS enabled when required and use the database server name for certificate verification.",sshDisableHint:"Saving with SSH off removes the saved tunnel settings and SSH credentials.",sshFieldsRequired:"SSH host, user, authentication method and a pinned SHA256 host fingerprint are required.",sshPortInvalid:"SSH port must be a whole number from 1 to 65535.",sshFingerprintInvalid:"Enter a pinned SHA256 host fingerprint (SHA256: followed by 43 base64 characters, optionally ending in =).",tlsServerName:"TLS server name",tlsServerNameHint:"Leave blank to use the database host. This is the database certificate name, not the SSH host or a local forwarding address.",sqlserverVerifyCaUnsupported:"SQL Server cannot verify the certificate chain without host-name verification. Choose full verification or another supported TLS mode.",engine:"Engine",host:"Host",port:"Port",user:"User",password:"Password",database:"Database",schema:"Schema",file:"Database file",redisDb:"Database index",color:"Environment colour",identity:"Identity",group:"Group",sslDisable:"TLS off",sslRequire:"TLS, certificate not verified",sslVerifyCa:"TLS, verify certificate chain",sslVerifyFull:"TLS, verify certificate and host name",connectionLost:"Connection lost \u2014 reconnect failed.",bannerTools:"The agent can inspect and query these connections.",writesEnabled:"Writes enabled for the agent",writesDisabled:"Read-only for the agent",unsaved:"Unsaved",copyName:"Copy name",openInQuery:"Open in query",tablesCount:"{n} table(s)",viewsCount:"{n} view(s)",routinesCount:"{n} routine(s)",server:"Server",updatedAt:"Updated",version:"Version",boundProject:"Project",noGroups:"Ungrouped"},Dn={meta:{title:"Grid \u6570\u636E\u5E93",description:"\u6570\u636E\u5E93\u5DE5\u4F5C\u53F0\uFF1A\u8FDE\u63A5\uFF08\u5206\u7EC4+\u73AF\u5883\u8272\uFF09\u3001\u5E93\u8868\u6D4F\u89C8\u3001\u53EF\u7F16\u8F91\u6570\u636E\u7F51\u683C\u3001\u5E26\u8865\u5168\u7684 SQL \u63A7\u5236\u53F0\u3001\u67E5\u8BE2\u4FDD\u5B58\u4E0E\u5907\u4EFD\uFF0C\u5E76\u5411 Agent \u63D0\u4F9B\u53EA\u8BFB\u5E93\u4E0A\u4E0B\u6587\u3002"},panel:"\u6570\u636E\u5E93",connections:"\u8FDE\u63A5",tabGeneral:"\u5E38\u89C4",tabSsh:"SSH \u96A7\u9053",tabSsl:"SSL / TLS",workspaces:"\u5DE5\u4F5C\u533A",noWorkspaces:"\u8FD9\u4E2A profile \u91CC\u8FD8\u6CA1\u6709\u6CE8\u518C\u5DE5\u4F5C\u533A\u3002",databases:"\u6570\u636E\u5E93",newConnection:"\u65B0\u5EFA\u8FDE\u63A5",newQuery:"\u65B0\u5EFA\u67E5\u8BE2",tables:"\u8868",views:"\u89C6\u56FE",functions:"\u51FD\u6570",users:"\u7528\u6237",queries:"\u67E5\u8BE2",overview:"\u6982\u89C8",connect:"\u8FDE\u63A5",disconnect:"\u65AD\u5F00",test:"\u6D4B\u8BD5\u8FDE\u63A5",edit:"\u7F16\u8F91",delete:"\u5220\u9664",refresh:"\u5237\u65B0",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",closeThisTab:"\u5173\u95ED\u6B64\u6807\u7B7E",closeAllTabs:"\u5173\u95ED\u5168\u90E8\u6807\u7B7E",closeOtherTabs:"\u5173\u95ED\u5176\u4ED6\u6807\u7B7E",closeTabsToRight:"\u5173\u95ED\u53F3\u4FA7\u6807\u7B7E",closeTabsToLeft:"\u5173\u95ED\u5DE6\u4FA7\u6807\u7B7E",optional:"\u9009\u586B",required:"\u5FC5\u586B",confirm:"\u786E\u5B9A",apply:"\u5E94\u7528",clear:"\u6E05\u7A7A",search:"\u641C\u7D22\u2026",loading:"\u52A0\u8F7D\u4E2D\u2026",error:"\u9519\u8BEF",name:"\u540D\u79F0",type:"\u7C7B\u578B",comment:"\u6CE8\u91CA",rows:"\u884C\u6570",estimatedTotal:"\u8BE5\u884C\u6570\u6765\u81EA\u5F15\u64CE\u4F30\u7B97\uFF1B\u70B9\u5237\u65B0\u53EF\u83B7\u53D6\u7CBE\u786E\u503C\u3002",size:"\u5927\u5C0F",total:"\u5408\u8BA1",selectConnection:"\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u8FDE\u63A5\u5F00\u59CB\u3002",selectDatabase:"\u9009\u62E9\u4E00\u4E2A\u6570\u636E\u5E93\u6765\u5217\u51FA\u5B83\u7684\u5BF9\u8C61\u3002",emptyTables:"\u8FD9\u4E2A\u6570\u636E\u5E93\u91CC\u6CA1\u6709\u8868\u6216\u89C6\u56FE\u3002",emptyTable:"\u8FD9\u5F20\u8868\u8FD8\u6CA1\u6709\u6570\u636E\u3002",emptyResult:"\u67E5\u8BE2\u6CA1\u6709\u8FD4\u56DE\u4EFB\u4F55\u884C\u3002",emptyObjects:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u5185\u5BB9\u3002",data:"\u6570\u636E",structure:"\u7ED3\u6784",columns:"\u5B57\u6BB5",indexes:"\u7D22\u5F15",ddl:"DDL",noIndexes:"\u6CA1\u6709\u7D22\u5F15\u3002",nullable:"\u53EF\u7A7A",default:"\u9ED8\u8BA4\u503C",primaryKey:"\u4E3B\u952E",insertRow:"\u63D2\u5165\u884C",editRow:"\u7F16\u8F91\u884C",rowSaved:"\u884C\u5DF2\u4FDD\u5B58",rowInserted:"\u5DF2\u63D2\u5165\u4E00\u884C",insertRowFailed:"\u65E0\u6CD5\u7528\u9ED8\u8BA4\u503C\u63D2\u5165\u65B0\u884C\u3002",deleteRow:"\u5220\u9664\u884C",confirmDelete:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E00\u884C\uFF1F",confirmDeleteConnection:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8FDE\u63A5\uFF1F\u4FDD\u5B58\u7684\u5BC6\u7801\u4E5F\u4F1A\u4E00\u5E76\u5220\u9664\u3002",confirmDeleteKey:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u952E\uFF1F",noPrimaryKey:"\u8BE5\u8868\u6CA1\u6709\u4E3B\u952E\uFF0C\u65E0\u6CD5\u5B89\u5168\u5B9A\u4F4D\u884C\uFF0C\u7F16\u8F91\u5DF2\u7981\u7528\u3002",cellSaved:"\u5DF2\u4FDD\u5B58",deleted:"\u5DF2\u5220\u9664",saved:"\u5DF2\u4FDD\u5B58",copied:"\u5DF2\u590D\u5236",page:"\u7B2C {page} / {pages} \u9875",pageSize:"\u6BCF\u9875\u884C\u6570",prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875",selection:"\u9009\u533A {n}",sum:"\u5408\u8BA1",avg:"\u5E73\u5747",count:"\u8BA1\u6570",exportCsv:"\u5BFC\u51FA CSV",exportJson:"\u5BFC\u51FA JSON",exportInsert:"\u5BFC\u51FA INSERT \u8BED\u53E5",exportMarkdown:"\u5BFC\u51FA Markdown \u8868\u683C",exportAs:"\u5BFC\u51FA",importCsv:"\u5BFC\u5165 CSV",importDone:"\u5DF2\u5BFC\u5165 {n} \u884C",importEmpty:"\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u6570\u636E\u884C\u3002",importNoColumns:"\u8BF7\u5148\u6253\u5F00\u8BE5\u8868\uFF0C\u4EE5\u4FBF\u77E5\u9053\u5217\u540D\u3002",importUnknownColumns:"\u6587\u4EF6\u91CC\u6709\u672C\u8868\u4E0D\u5B58\u5728\u7684\u5217\uFF1A{cols}",importFailed:"\u5DF2\u5BFC\u5165 {n} \u884C\uFF0C\u968F\u540E\u4E2D\u65AD\uFF1A{error}",exportTruncated:"\u5BFC\u51FA\u4E0A\u9650\u4E3A {n} \u884C",filter:"\u7B5B\u9009",filterBuilder:"\u7B5B\u9009\u6784\u5EFA\u5668",rawWhere:"\u539F\u59CB WHERE",addCondition:"\u6DFB\u52A0\u6761\u4EF6",matchAll:"\u5168\u90E8\u6EE1\u8DB3",matchAny:"\u4EFB\u4E00\u6EE1\u8DB3",columnChooser:"\u5B57\u6BB5\u663E\u793A",showAll:"\u5168\u90E8\u663E\u793A",resetWidths:"\u91CD\u7F6E\u5217\u5BBD",run:"\u6267\u884C",cancelQuery:"\u53D6\u6D88\u6267\u884C",queryCancelled:"\u5DF2\u53D6\u6D88",cancelUnsupported:"\u8BE5\u5F15\u64CE\u65E0\u6CD5\u53D6\u6D88\u6B63\u5728\u6267\u884C\u7684\u8BED\u53E5\u3002",runHint:"Ctrl/Cmd + Enter \u6267\u884C",explain:"\u89E3\u91CA",beautify:"\u7F8E\u5316",history:"\u5386\u53F2",noHistory:"\u8FD8\u6CA1\u6709\u6267\u884C\u8FC7\u67E5\u8BE2\u3002",result:"\u7ED3\u679C {n}",statementCount:"{n} \u6761\u8BED\u53E5",queryOk:"{n} \u884C\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",resultTruncated:"\u7ED3\u679C\u5DF2\u622A\u65AD\uFF1A\u53EA\u663E\u793A\u524D 2 000 \u884C\u3002",queryFailed:"\u5931\u8D25\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",affected:"\u5F71\u54CD {n} \u884C",noStatements:"\u6CA1\u6709\u53EF\u6267\u884C\u7684\u5185\u5BB9\u3002",completionHint:"Ctrl + Space \u5524\u8D77\u8865\u5168",readOnlyHint:"\u4EC5\u53EA\u8BFB\u8BED\u53E5",redisKeys:"\u952E",redisPattern:"\u5339\u914D\u6A21\u5F0F",redisType:"\u7C7B\u578B",scanMore:"\u7EE7\u7EED\u626B\u63CF",ttl:"\u5269\u4F59\u65F6\u95F4",noTtl:"\u6C38\u4E0D\u8FC7\u671F",keyValue:"\u503C",command:"\u547D\u4EE4",commandHint:"\u4F8B\u5982 GET user:1",reply:"\u8FD4\u56DE",deleteKey:"\u5220\u9664\u952E",newKey:"\u65B0\u5EFA\u952E",setTtl:"\u8BBE\u7F6E TTL",rename:"\u91CD\u547D\u540D",editValue:"\u7F16\u8F91\u503C",saveQuery:"\u4FDD\u5B58\u67E5\u8BE2",queryName:"\u67E5\u8BE2\u540D\u79F0",querySaved:"\u67E5\u8BE2\u5DF2\u4FDD\u5B58",noQueries:"\u8FD8\u6CA1\u6709\u4FDD\u5B58\u7684\u67E5\u8BE2\u3002\u53EF\u4EE5\u5728 SQL \u63A7\u5236\u53F0\u91CC\u4FDD\u5B58\uFF0C\u4E5F\u53EF\u4EE5\u8BA9 Agent \u5E2E\u4F60\u4FDD\u5B58\u3002",openInEditor:"\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00",runQuery:"\u6267\u884C",source:"\u6765\u6E90",bindProject:"\u7ED1\u5B9A\u5230\u5F53\u524D\u9879\u76EE",unbindProject:"\u89E3\u9664\u9879\u76EE\u7ED1\u5B9A",projectBound:"\u672C\u6B21\u5BF9\u8BDD\u53EF\u4EE5\u76F4\u63A5\u8BFB\u53D6 {name}\uFF08{database}\uFF09\uFF0C\u65E0\u9700\u53CD\u590D\u786E\u8BA4\u3002",projectUnbound:"\u5C1A\u672A\u7ED1\u5B9A\u5230\u5F53\u524D\u5DE5\u4F5C\u533A\uFF0CAgent \u9700\u8981\u5148\u8BE2\u95EE\u4F7F\u7528\u54EA\u4E2A\u8FDE\u63A5\u3002",readOnlyForAgent:"Agent \u8BBF\u95EE\u4E3A\u53EA\u8BFB",agentHint:"Agent \u53EF\u4EE5\u901A\u8FC7 grid_* \u5DE5\u5177\u5217\u51FA\u3001\u68C0\u67E5\u3001\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\uFF0C\u4E5F\u80FD\u66FF\u4F60\u4FDD\u5B58\u67E5\u8BE2\u3002",functionKind:"\u51FD\u6570",procedureKind:"\u5B58\u50A8\u8FC7\u7A0B",returnType:"\u8FD4\u56DE\u7C7B\u578B",language:"\u8BED\u8A00",definition:"\u5B9A\u4E49",noRoutines:"\u6CA1\u6709\u51FD\u6570\u6216\u5B58\u50A8\u8FC7\u7A0B\u3002",accountName:"\u7528\u6237",accountHost:"\u4E3B\u673A",accountPlugin:"\u8BA4\u8BC1\u63D2\u4EF6",accountLocked:"\u5DF2\u9501\u5B9A",accountPrivileged:"\u7279\u6743",noAccounts:"\u8BE5\u8FDE\u63A5\u770B\u4E0D\u5230\u7528\u6237\u5217\u8868\u3002",driverMissing:"\u672A\u5B89\u88C5 {engine} \u9A71\u52A8\uFF0C\u8BF7\u5728\u63D2\u4EF6\u76EE\u5F55\u6267\u884C `pnpm add {pkg}`\u3002",engineUnavailable:"\u4E0D\u53EF\u7528",testOk:"\u8FDE\u63A5\u6210\u529F \xB7 {version} \xB7 {ms} \u6BEB\u79D2",testFailed:"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}",passwordKeep:"\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u5DF2\u4FDD\u5B58\u7684\u5BC6\u7801",secretKeep:"\u5DF2\u6709\u4FDD\u5B58\u7684\u51ED\u636E\uFF1B\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u3002\u4EC5\u70B9\u51FB\u300C\u6E05\u7A7A\u51ED\u636E\u300D\u624D\u4F1A\u79FB\u9664\u3002",secretClear:"\u6E05\u7A7A\u51ED\u636E",secretUndoClear:"\u64A4\u9500\u6E05\u7A7A",secretClearPending:"\u4FDD\u5B58\u65F6\u5C06\u6E05\u7A7A\u6B64\u51ED\u636E\uFF1B\u8F93\u5165\u65B0\u503C\u4F1A\u53D6\u6D88\u6E05\u7A7A\u3002",sshSection:"SSH \u96A7\u9053",sshEnable:"\u901A\u8FC7 SSH \u8FDE\u63A5",sshSingleHopHint:"\u4EC5\u652F\u6301\u5355\u8DF3\uFF1BSSH \u670D\u52A1\u5668\u4FE1\u606F\u4E0E\u56FA\u5B9A\u4E3B\u673A\u6307\u7EB9\u5747\u4E3A\u5FC5\u586B\u9879\u3002",sshHost:"SSH \u4E3B\u673A",sshPort:"SSH \u7AEF\u53E3",sshUsername:"SSH \u7528\u6237\u540D",sshAuthType:"SSH \u8BA4\u8BC1\u65B9\u5F0F",sshAuthPassword:"\u5BC6\u7801",sshAuthPrivateKey:"\u79C1\u94A5",sshHostFingerprint:"\u56FA\u5B9A SSH \u4E3B\u673A\u6307\u7EB9",sshFingerprintHint:"\u8BF7\u901A\u8FC7\u7BA1\u7406\u5458\u7684\u53EF\u4FE1\u6E20\u9053\u83B7\u53D6 SHA256:\u2026 \u4E3B\u673A\u6307\u7EB9\uFF1B\u4E0D\u4F1A\u81EA\u52A8\u63A2\u6D4B\u6216\u4FE1\u4EFB\u6307\u7EB9\u3002",sshPassword:"SSH \u5BC6\u7801",sshPrivateKey:"SSH \u79C1\u94A5",sshPrivateKeyHint:"\u7C98\u8D34\u5B8C\u6574\u79C1\u94A5\u3002\u5DF2\u4FDD\u5B58\u7684\u79C1\u94A5\u4E0D\u4F1A\u56DE\u8BFB\uFF0C\u4E5F\u4E0D\u4F1A\u8BFB\u53D6\u4E3B\u673A\u4E0A\u7684\u4EFB\u610F\u8DEF\u5F84\u6587\u4EF6\u3002",sshPassphrase:"\u79C1\u94A5\u53E3\u4EE4\uFF08\u53EF\u9009\uFF09",sshDatabaseHostHint:"\u6570\u636E\u5E93\u4E3B\u673A\u4EE5 SSH \u8DF3\u677F\u673A\u7684\u89C6\u89D2\u89E3\u6790\uFF1B127.0.0.1 \u6307\u8DF3\u677F\u673A\u672C\u673A\u3002",sshSecurityHint:"SSH \u4E0D\u4EE3\u66FF\u6570\u636E\u5E93 TLS\u3002\u9700\u8981\u65F6\u4ECD\u5E94\u542F\u7528\u6570\u636E\u5E93 TLS\uFF0C\u5E76\u4F7F\u7528\u6570\u636E\u5E93\u670D\u52A1\u5668\u540D\u6821\u9A8C\u8BC1\u4E66\u3002",sshDisableHint:"\u5173\u95ED SSH \u540E\u4FDD\u5B58\u4F1A\u79FB\u9664\u5DF2\u4FDD\u5B58\u7684\u96A7\u9053\u8BBE\u7F6E\u548C SSH \u51ED\u636E\u3002",sshFieldsRequired:"\u8BF7\u586B\u5199 SSH \u4E3B\u673A\u3001\u7528\u6237\u540D\u3001\u8BA4\u8BC1\u65B9\u5F0F\u53CA\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\u3002",sshPortInvalid:"SSH \u7AEF\u53E3\u5FC5\u987B\u662F 1 \u81F3 65535 \u7684\u6574\u6570\u3002",sshFingerprintInvalid:"\u8BF7\u8F93\u5165\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\uFF08SHA256: \u540E\u8DDF 43 \u4E2A base64 \u5B57\u7B26\uFF0C\u53EF\u5E26\u672B\u5C3E =\uFF09\u3002",tlsServerName:"TLS \u670D\u52A1\u5668\u540D",tlsServerNameHint:"\u7559\u7A7A\u9ED8\u8BA4\u4F7F\u7528\u6570\u636E\u5E93\u4E3B\u673A\u3002\u586B\u5199\u6570\u636E\u5E93\u8BC1\u4E66\u4E0A\u7684\u670D\u52A1\u5668\u540D\uFF0C\u800C\u4E0D\u662F SSH \u4E3B\u673A\u6216\u672C\u5730\u8F6C\u53D1\u5730\u5740\u3002",sqlserverVerifyCaUnsupported:"SQL Server \u4E0D\u652F\u6301\u4EC5\u6821\u9A8C\u8BC1\u4E66\u94FE\u800C\u4E0D\u6821\u9A8C\u4E3B\u673A\u540D\uFF1B\u8BF7\u9009\u62E9\u5B8C\u6574\u6821\u9A8C\u6216\u5176\u4ED6\u652F\u6301\u7684 TLS \u6A21\u5F0F\u3002",engine:"\u5F15\u64CE",host:"\u4E3B\u673A",port:"\u7AEF\u53E3",user:"\u7528\u6237\u540D",password:"\u5BC6\u7801",database:"\u6570\u636E\u5E93",schema:"Schema",file:"\u6570\u636E\u5E93\u6587\u4EF6",redisDb:"\u5E93\u5E8F\u53F7",color:"\u73AF\u5883\u8272",identity:"\u6807\u8BC6",group:"\u5206\u7EC4",sslDisable:"\u5173\u95ED TLS",sslRequire:"TLS\uFF0C\u4E0D\u6821\u9A8C\u8BC1\u4E66",sslVerifyCa:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u94FE",sslVerifyFull:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u4E0E\u4E3B\u673A\u540D",connectionLost:"\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u91CD\u8FDE\u5931\u8D25\u3002",bannerTools:"Agent \u53EF\u4EE5\u68C0\u67E5\u5E76\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\u3002",writesEnabled:"Agent \u53EF\u5199",writesDisabled:"Agent \u53EA\u8BFB",unsaved:"\u672A\u4FDD\u5B58",copyName:"\u590D\u5236\u540D\u79F0",openInQuery:"\u5728\u67E5\u8BE2\u4E2D\u6253\u5F00",tablesCount:"{n} \u5F20\u8868",viewsCount:"{n} \u4E2A\u89C6\u56FE",routinesCount:"{n} \u4E2A\u4F8B\u7A0B",server:"\u670D\u52A1\u5668",updatedAt:"\u66F4\u65B0\u65F6\u95F4",version:"\u7248\u672C",boundProject:"\u9879\u76EE",noGroups:"\u672A\u5206\u7EC4"},qt={en:Pn,zh:Dn};var Ce=require("react");var mt=new Set("select from where group by order having limit offset join inner left right full outer cross on as and or not in is null like ilike between exists case when then else end union all distinct insert into values update set delete create table view index alter add drop truncate primary key foreign references unique default constraint cascade returning with recursive asc desc explain analyze show describe use begin commit rollback transaction if temporary materialized over partition window rows range current row unbounded preceding following fetch next only for share nowait".split(/\s+/)),ft=new Set("count sum avg min max coalesce nullif cast convert round floor ceil abs length lower upper trim ltrim rtrim substr substring replace concat concat_ws now current_timestamp current_date current_time date_trunc extract date_part to_char to_date row_number rank dense_rank ntile lag lead first_value last_value json_extract array_agg string_agg group_concat ifnull greatest least random uuid gen_random_uuid".split(/\s+/)),At=["SELECT","FROM","WHERE","GROUP BY","ORDER BY","HAVING","LIMIT","OFFSET","UNION ALL","UNION","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","RETURNING","LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN","JOIN"];function bt(t){let e=String(t??""),n=[],a=0,o=(r,m)=>{if(!m)return;let g=n[n.length-1];g&&g.type===r?g.value+=m:n.push({type:r,value:m})};for(;a<e.length;){let r=e[a],m=e.slice(a);if(r==="-"&&e[a+1]==="-"){let g=e.indexOf(`
`,a),u=g===-1?e.length:g;o("comment",e.slice(a,u)),a=u;continue}if(r==="/"&&e[a+1]==="*"){let g=e.indexOf("*/",a+2),u=g===-1?e.length:g+2;o("comment",e.slice(a,u)),a=u;continue}if(r==="'"||r==='"'||r==="`"){let g=a+1;for(;g<e.length;){if(e[g]==="\\"){g+=2;continue}if(e[g]===r){if(e[g+1]===r){g+=2;continue}g+=1;break}g+=1}o(r==="'"?"string":"ident",e.slice(a,g)),a=g;continue}if(r==="$"&&/^\$[A-Za-z_]*\$/.test(m)){let g=/^\$[A-Za-z_]*\$/.exec(m)[0],u=e.indexOf(g,a+g.length),b=u===-1?e.length:u+g.length;o("string",e.slice(a,b)),a=b;continue}if(/[0-9]/.test(r)||r==="."&&/[0-9]/.test(e[a+1]??"")){let g=/^[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/.exec(m);o("number",g?g[0]:r),a+=g?g[0].length:1;continue}if(/[A-Za-z_@:]/.test(r)){let u=/^[A-Za-z_@:][A-Za-z0-9_$@:]*/.exec(m)[0],b=u.toLowerCase(),w=e[a+u.length];r==="@"||r===":"?o("variable",u):mt.has(b)?o("keyword",u):w==="("||ft.has(b)?o("function",u):o("plain",u),a+=u.length;continue}if(/[(),;]/.test(r)){o("punct",r),a+=1;continue}if(/[=<>!+\-*/%|]/.test(r)){let g=/^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/.exec(m);o("operator",g?g[0]:r),a+=g?g[0].length:1;continue}o("ws",r),a+=1}return n}function Lt(t){let e=String(t??"").trim();if(!e)return"";let n=bt(e),a=[],o="",r=0,m=()=>{let g=o.trim();g&&a.push(g),o=""};for(let g=0;g<n.length;g+=1){let u=n[g];if(u.type==="ws"){o!==""&&!o.endsWith(" ")&&(o+=" ");continue}if(u.type==="comment"){m(),a.push(u.value.trim());continue}if(u.type==="punct"){u.value==="("&&(r+=1),u.value===")"&&(r=Math.max(0,r-1)),o+=u.value;continue}if(u.type==="keyword"){let b=u.value.toUpperCase(),w=n[g+1],L=n[g+2];if(w&&w.type==="ws"&&L&&L.type==="keyword"){let $=`${b} ${L.value.toUpperCase()}`;At.includes($)&&(b=$,g+=2)}if(r===0&&At.includes(b)){m(),o=`${b} `;continue}o+=`${b} `;continue}o+=u.value}return m(),a.length<2?e:a.join(`
  `).replace(/[ \t]+$/gm,"")}function Ke(t,e){let n=String(e??"");return t==="mysql"?"`"+n.replace(/`/g,"``")+"`":t==="sqlserver"?"["+n.replace(/]/g,"]]")+"]":'"'+n.replace(/"/g,'""')+'"'}function pt(t){let e=String(t??"").trim();return e===""?"''":/^-?\d+(\.\d+)?$/.test(e)?e:/^(null|true|false)$/i.test(e)?e.toUpperCase():`'${e.replace(/'/g,"''")}'`}var Ht=["=","<>",">",">=","<","<=","LIKE","NOT LIKE","IN","BETWEEN","IS NULL","IS NOT NULL"];function vt(t,e){let n=[];for(let a of e.conditions){if(!a.column)continue;let o=Ke(t,a.column),r=a.op;if(r==="IS NULL"||r==="IS NOT NULL"){n.push(`${o} ${r}`);continue}let m=String(a.value??"");if(m!==""){if(r==="IN"){let g=m.split(",").map(pt).filter(Boolean);if(g.length===0)continue;n.push(`${o} IN (${g.join(", ")})`);continue}if(r==="BETWEEN"){let g=m.split(",").map(pt);if(g.length<2)continue;n.push(`${o} BETWEEN ${g[0]} AND ${g[1]}`);continue}n.push(`${o} ${r} ${pt(m)}`)}}return n.join(` ${e.joiner} `)}function Bt(t,e){let n=document.createElement("div"),a=window.getComputedStyle(t),o=["fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","padding","border","whiteSpace","wordWrap","tabSize"];for(let u of o)n.style[u]=a[u];n.style.position="absolute",n.style.visibility="hidden",n.style.width=`${t.clientWidth}px`,n.style.whiteSpace="pre-wrap",n.style.overflowWrap="break-word",n.textContent=t.value.slice(0,e);let r=document.createElement("span");r.textContent="\u200B",n.appendChild(r),document.body.appendChild(n);let m=r.offsetLeft-t.scrollLeft,g=r.offsetTop-t.scrollTop;return document.body.removeChild(n),{left:Math.max(0,m),top:g}}function fe(t,e){return String(t).replace(/\{(\w+)\}/g,(n,a)=>e&&e[a]!==void 0?String(e[a]):n)}function _e(t,e,n=300){if(t==null)return{text:e,isNull:!0,numeric:!1};if(typeof t=="object")try{let o=JSON.stringify(t);return{text:o.length>n?`${o.slice(0,n)}\u2026`:o,isNull:!1,numeric:!1}}catch{return{text:String(t),isNull:!1,numeric:!1}}let a=String(t);return{text:a.length>n?`${a.slice(0,n)}\u2026`:a,isNull:!1,numeric:typeof t=="number"}}function Ge(t){if(t==null)return"";let e=typeof t=="object"?JSON.stringify(t):String(t);return/[",\n\r]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Ot(t){return String(t||"table").replace(/[^\w.-]+/g,"_").slice(0,60)}function Je(t,e,n){let a=new Blob([n],{type:`${e};charset=utf-8`}),o=URL.createObjectURL(a),r=document.createElement("a");r.href=o,r.download=t,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(o),1e3)}function $n(t,e){return t==null?"NULL":typeof t=="number"?Number.isFinite(t)?String(t):"NULL":typeof t=="boolean"?e==="sqlserver"?t?"1":"0":t?"TRUE":"FALSE":`'${(typeof t=="object"?JSON.stringify(t):String(t)).replace(/'/g,"''")}'`}function Kt(t,e,n,a){let r=[e.database,...t==="postgres"||t==="sqlserver"?[e.schema]:[],e.table].filter(Boolean).map(g=>Ke(t,g)).join("."),m=n.map(g=>Ke(t,g.name)).join(", ");return a.map(g=>`INSERT INTO ${r} (${m}) VALUES (${n.map(u=>$n(g[u.name],t)).join(", ")});`).join(`
`)}function Ft(t,e){let n=m=>m==null?"":(typeof m=="object"?JSON.stringify(m):String(m)).replace(/\|/g,"\\|").replace(/\r?\n/g," "),a=`| ${t.map(m=>n(m.name)).join(" | ")} |`,o=`| ${t.map(()=>"---").join(" | ")} |`,r=e.map(m=>`| ${t.map(g=>n(m[g.name])).join(" | ")} |`);return[a,o,...r].join(`
`)}function jt(t){let e=String(t??"").replace(/^\uFEFF/,""),n=[],a=[],o=[],r="",m=!1,g=1,u=1,b=0,w=()=>{o.push(r),r=""},L=()=>{w(),(o.length>1||o[0]!=="")&&n.push(o),o=[]};for(;b<e.length;){let B=e[b];if(m){if(B==='"'){if(e[b+1]==='"'){r+='"',b+=2;continue}m=!1,b+=1;continue}(B===`
`||B==="\r")&&(u+=1),r+=B,b+=1;continue}if(B==='"'&&r===""){m=!0,g=u,b+=1;continue}if(B===","){w(),b+=1;continue}if(B==="\r"){b+=e[b+1]===`
`?2:1,u+=1,L();continue}if(B===`
`){b+=1,u+=1,L();continue}r+=B,b+=1}(r!==""||o.length>0)&&L(),m&&a.push(`the quoted field starting on line ${g} is not closed`);let[$=[],...N]=n,O=$.length;O===0&&a.push("the file has no header row");let R=new Set;return $.forEach((B,H)=>{let E=B.trim();E||a.push(`header field ${H+1} is empty`),R.has(E)&&a.push(`header "${E}" appears more than once`),R.add(E)}),N.forEach((B,H)=>{B.length>O&&a.push(`row ${H+2} has ${B.length} fields but the header has ${O}`)}),{header:$.map(B=>B.trim()),rows:N.map(B=>{let H=B.slice(0,O);for(;H.length<O;)H.push("");return H}),errors:a}}function Qt(t){if(!Number.isFinite(t)||t<=0)return"0 B";let e=["B","KB","MB","GB"],n=t,a=0;for(;n>=1024&&a<e.length-1;)n/=1024,a+=1;return`${n.toFixed(a===0?0:1)} ${e[a]}`}function Vt(t){let e=Date.parse(t);if(Number.isNaN(e))return"";let n=Math.max(1,Math.round((Date.now()-e)/1e3));return n<60?`${n}s`:n<3600?`${Math.round(n/60)}m`:n<86400?`${Math.round(n/3600)}h`:`${Math.round(n/86400)}d`}var Ut=require("react");var Ye=class extends Error{constructor(n,a){super(n);this.status=a;this.name="ApiError"}},qn="api/grid",ht=class{constructor(e=qn){this.path=e}async call(e,n={},a){let o;try{o=await fetch(this.path,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:e,...n}),...a?{signal:a}:{}})}catch(g){throw g instanceof DOMException&&g.name==="AbortError"?g:new Ye(g instanceof Error?g.message:String(g),0)}let r=null;try{r=await o.json()}catch{r=null}let m=r&&typeof r=="object"?r:{};if(!o.ok||m.error)throw new Ye(String(m.error??`request failed (${o.status})`),o.status);return m}meta(){return this.call("meta")}listConnections(){return this.call("connections.list")}createConnection(e){return this.call("connections.create",{connection:e})}updateConnection(e,n){return this.call("connections.update",{id:e,patch:n})}deleteConnection(e){return this.call("connections.delete",{id:e})}testConnection(e){return this.call("connections.test",{id:e})}testDraft(e,n){return this.call("connections.test",{connection:e,...n?{id:n}:{}})}connect(e){return this.call("connections.connect",{id:e})}disconnect(e){return this.call("connections.disconnect",{id:e})}sessions(){return this.call("connections.sessions")}databases(e){return this.call("databases",{connectionId:e})}relations(e,n,a){return this.call("tables",{connectionId:e,database:n,schema:a})}describe(e,n,a,o){return this.call("columns",{connectionId:e,database:n,schema:a,table:o})}rows(e,n){return this.call("rows",e,n)}updateRow(e){return this.call("rows.update",e)}insertRow(e){return this.call("rows.insert",e)}insertRows(e){return this.call("rows.insertMany",e)}deleteRow(e){return this.call("rows.delete",e)}exportRows(e){return this.call("export",e)}sql(e){return this.call("sql",e)}sqlCancel(e){return this.call("sql.cancel",{connectionId:e})}routines(e,n,a){return this.call("routines",{connectionId:e,database:n,schema:a})}accounts(e){return this.call("accounts",{connectionId:e})}listQueries(){return this.call("queries.list")}saveQuery(e){return this.call("queries.save",e)}deleteQuery(e){return this.call("queries.delete",{id:e})}bindProject(e){return this.call("projects.bind",e)}unbindProject(e){return this.call("projects.unbind",{workspaceId:e})}redisDatabases(e){return this.call("redis.databases",{connectionId:e})}redisScan(e){return this.call("redis.scan",e)}redisKey(e,n,a){return this.call("redis.key",{connectionId:e,key:n,database:a})}redisCommand(e,n){return this.call("redis.command",{connectionId:e,command:n})}redisDelete(e,n,a){return this.call("redis.delete",{connectionId:e,key:n,database:a})}engines(){return this.call("meta")}},U=new ht;var Le=class{constructor(e){this.listeners=new Set;this.getSnapshot=()=>this.state;this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)});this.state=e}setState(e){this.state=e;for(let n of this.listeners)n()}patch(e){this.setState({...this.state,...e})}};function ve(t){return(0,Ut.useSyncExternalStore)(t.subscribe,t.getSnapshot,t.getSnapshot)}var yt=class extends Le{constructor(){super({meta:null,error:""})}async load(){try{this.patch({meta:await U.meta(),error:""})}catch(e){this.patch({error:e instanceof Error?e.message:String(e)})}}get current(){return this.state.meta}engines(){return this.state.meta?.engines??[]}get allowWrites(){return this.state.meta?.allowWrites===!0}},Wt={status:"closed",version:"",error:"",databases:[]},xt=class extends Le{constructor(){super({items:[],activeId:"",loading:!1,error:"",sessions:{},testing:{}})}async load(){this.patch({loading:!0});try{let{connections:e}=await U.listConnections(),n=this.state.items.some(a=>a.id===this.state.activeId)?this.state.activeId:e[0]?.id??"";this.patch({items:e,activeId:n,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}select(e){this.patch({activeId:e})}get active(){return this.state.items.find(e=>e.id===this.state.activeId)??null}session(e){return this.state.sessions[e]??Wt}setSession(e,n){let a=this.session(e);this.patch({sessions:{...this.state.sessions,[e]:{...a,...n}}})}async create(e){let n=await U.createConnection(e);return await this.load(),this.select(n.connection.id),n.probe}async update(e,n){await U.updateConnection(e,n),this.setSession(e,{status:"closed",version:"",databases:[]}),await this.load()}async remove(e){await U.deleteConnection(e);let n={...this.state.sessions};delete n[e],this.patch({sessions:n}),await this.load()}async test(e){this.patch({testing:{...this.state.testing,[e]:!0}});try{return await U.testConnection(e)}finally{this.patch({testing:{...this.state.testing,[e]:!1}})}}async connect(e){if(this.session(e).status!=="open"){this.setSession(e,{status:"opening",error:""});try{let n=await U.connect(e),{databases:a}=await U.databases(e);this.setSession(e,{status:"open",version:n.serverVersion,databases:a,error:""})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}}async disconnect(e){await U.disconnect(e).catch(()=>{}),this.setSession(e,{...Wt})}async reloadDatabases(e){if(this.session(e).status!=="open")return this.connect(e);try{let{databases:n}=await U.databases(e);this.setSession(e,{databases:n})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}};function Jt(t,e,n=""){return`${t}|${e}|${n}`}var wt=class extends Le{constructor(){super({relations:{},routines:{},accounts:{},loading:{},errors:{}})}relationsOf(e){return this.state.relations[e]??[]}routinesOf(e){return this.state.routines[e]??[]}accountsOf(e){return this.state.accounts[e]??[]}isLoading(e){return this.state.loading[e]===!0}errorOf(e){return this.state.errors[e]??""}async run(e,n,a){this.patch({loading:{...this.state.loading,[e]:!0}});try{let o=await n();this.setState({...this.state,...a(o),loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:""}})}catch(o){this.setState({...this.state,loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:o instanceof Error?o.message:String(o)}})}}async loadRelations(e,n,a="",o=!1){let r=Jt(e,n,a);!o&&this.state.relations[r]||await this.run(r,()=>U.relations(e,n,a),({tables:m})=>({relations:{...this.state.relations,[r]:m}}))}async loadRoutines(e,n,a="",o=!1){let r=Jt(e,n,a);!o&&this.state.routines[r]||await this.run(r,()=>U.routines(e,n,a),({routines:m})=>({routines:{...this.state.routines,[r]:m}}))}async loadAccounts(e,n=!1){!n&&this.state.accounts[e]||await this.run(e,()=>U.accounts(e),({accounts:a})=>({accounts:{...this.state.accounts,[e]:a}}))}invalidate(e){let n={...this.state.relations};delete n[e],this.patch({relations:n})}},kt=class extends Le{constructor(){super({tabs:[],activeId:""})}open(e){let n=this.state.tabs.some(a=>a.id===e.id);this.setState({tabs:n?this.state.tabs:this.state.tabs.concat(e),activeId:e.id})}activate(e){this.patch({activeId:e})}close(e){let n=this.state.tabs.findIndex(r=>r.id===e),a=this.state.tabs.filter(r=>r.id!==e),o=a[Math.max(0,n-1)];this.setState({tabs:a,activeId:this.state.activeId===e?o?.id??"":this.state.activeId})}closeAll(){this.setState({tabs:[],activeId:""})}closeOthers(e){let n=this.state.tabs.find(a=>a.id===e);this.setState({tabs:n?[n]:[],activeId:n?n.id:""})}closeToRight(e){let n=this.state.tabs.findIndex(r=>r.id===e);if(n===-1)return;let a=this.state.tabs.slice(0,n+1),o=a.some(r=>r.id===this.state.activeId);this.setState({tabs:a,activeId:o?this.state.activeId:e})}closeToLeft(e){let n=this.state.tabs.findIndex(r=>r.id===e);if(n===-1)return;let a=this.state.tabs.slice(n),o=a.some(r=>r.id===this.state.activeId);this.setState({tabs:a,activeId:o?this.state.activeId:e})}closeConnection(e){let n=this.state.tabs.filter(o=>o.connectionId!==e),a=n.some(o=>o.id===this.state.activeId);this.setState({tabs:n,activeId:a?this.state.activeId:n[n.length-1]?.id??""})}get active(){return this.state.tabs.find(e=>e.id===this.state.activeId)??null}},St=class extends Le{constructor(){super({items:[],loading:!1,error:""})}async load(){this.patch({loading:!0});try{let{queries:e}=await U.listQueries();this.patch({items:e,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}async save(e){let{query:n}=await U.saveQuery(e);return await this.load(),n}async remove(e){await U.deleteQuery(e),await this.load()}},Ze=class{constructor(){this.meta=new yt;this.connections=new xt;this.catalog=new wt;this.tabs=new kt;this.queries=new St}async bootstrap(){await Promise.all([this.meta.load(),this.connections.load(),this.queries.load()])}bindings(){return this.meta.current?.bindings??[]}bindingFor(e){return this.bindings().find(n=>n.workspaceId===e)??null}};var Pe=require("react"),Nt=require("react-dom"),T=require("react/jsx-runtime"),Xt={plus:"M12 5v14M5 12h14",refresh:"M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6",play:"M8 5v14l11-7z",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",pencil:"M4 20h4L20 8l-4-4L4 16z",chevron:"M9 6l6 6-6 6",chevronLeft:"M15 6l-6 6 6 6",database:"M21 5c0 1.66-4.03 3-9 3S3 6.66 3 5s4.03-3 9-3 9 1.34 9 3z M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5 M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3",table:"M4 5h16v14H4zM4 10h16M10 10v9",view:"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",key:"M14 4a6 6 0 1 0-5.2 8.9L4 18v2h3v-3h3v-3h2.2A6 6 0 0 0 14 4z",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",download:"M12 4v10M8 11l4 4 4-4M5 19h14",x:"M6 6l12 12M18 6L6 18",check:"M5 13l4 4L19 7",plug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3",unplug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-6 6M12 18v3M4 4l16 16",filter:"M4 5h16l-6 7v6l-4 2v-8z",folder:"M3 6h6l2 2h10v11H3z",copy:"M9 9h10v10H9zM5 15V5h10",alert:"M12 4l9 16H3zM12 10v4M12 17h.01",columns:"M4 5h16M4 12h16M4 19h16",wand:"M4 20l10-10M14 5l1.5 1.5M18 3l1 2 2 .5-2 1.5.5 2-2-1-2 1 .5-2-2-1.5 2-.5z",history:"M12 8v5l3 2M4 12a8 8 0 1 0 3-6.2M4 4v4h4",function:"M9 4c-2 0-3 1-3 3v10c0 2-1 3-3 3M6 11h7M15 14l5 6M20 14l-5 6",user:"M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",bookmark:"M6 4h12v17l-6-4-6 4z",archive:"M4 4h16v4H4zM5 8h14v12H5zM9 13h6",link:"M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",info:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 8h.01",shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",eyeOff:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"};function k({name:t,size:e=14}){return(0,T.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:"false",children:(0,T.jsx)("path",{d:Xt[t]??Xt.table})})}function K(t){let e=["dg-btn","ant-btn"];return t.className&&e.push(t.className),t.variant&&t.variant!=="default"?(e.push(`dg-btn-${t.variant}`),e.push(`ant-btn-${t.variant}`)):e.push("ant-btn-default"),t.size&&(e.push(`dg-btn-${t.size}`),e.push(`ant-btn-${t.size}`)),t.active&&e.push("dg-btn-active","ant-btn-active"),t.loading&&e.push("ant-btn-loading"),t.block&&e.push("ant-btn-block"),(0,T.jsxs)("button",{type:t.type??"button",className:e.join(" "),onClick:t.onClick,disabled:t.disabled||t.loading,title:t.title,"aria-label":t.title,"aria-pressed":t.active,style:t.style,children:[t.loading?(0,T.jsx)(we,{}):t.icon?(0,T.jsx)(k,{name:t.icon,size:t.size==="sm"?11:13}):null,t.children]})}function ce(t){return(0,T.jsx)("button",{type:"button",className:`dg-iconbtn ant-btn ant-btn-icon-only${t.active?" dg-btn-active":""}${t.className?` ${t.className}`:""}`,title:t.title,"aria-label":t.title,onClick:t.onClick,disabled:t.disabled,children:(0,T.jsx)(k,{name:t.icon,size:t.size??13})})}function oe(t){return(0,T.jsxs)("label",{className:`dg-field ant-form-item${t.wide?" dg-field-wide":""}${t.required?" dg-field-required ant-form-item-required":""}${t.className?` ${t.className}`:""}`,style:t.style,children:[(0,T.jsx)("span",{className:"dg-field-label ant-form-item-label",children:t.label}),t.children,t.hint?(0,T.jsx)("span",{className:"dg-field-hint ant-form-item-explain",children:t.hint}):null]})}function ie(t){let{className:e,...n}=t;return(0,T.jsx)("input",{...n,className:`dg-input ant-input${e?` ${e}`:""}`})}function et(t){let{className:e,...n}=t;return(0,T.jsx)("textarea",{...n,className:`dg-input dg-textarea ant-input ant-input-textarea${e?` ${e}`:""}`})}function ke(t){return(0,T.jsx)("select",{...t,className:`dg-input dg-select ant-select${t.className?` ${t.className}`:""}`})}function Re(t){let e=["dg-card","ant-card"];return t.hoverable&&e.push("dg-card-hoverable","ant-card-hoverable"),t.size==="small"&&e.push("dg-card-sm","ant-card-small"),t.bordered===!1&&e.push("ant-card-borderless"),t.className&&e.push(t.className),(0,T.jsxs)("div",{className:e.join(" "),style:t.style,onClick:t.onClick,children:[t.title||t.extra?(0,T.jsxs)("div",{className:"dg-card-head ant-card-head",children:[(0,T.jsx)("div",{className:"dg-card-head-title ant-card-head-title",children:t.title}),t.extra?(0,T.jsx)("div",{className:"dg-card-extra ant-card-extra",children:t.extra}):null]}):null,(0,T.jsx)("div",{className:"dg-card-body ant-card-body",children:t.children})]})}function _t(t){return(0,T.jsx)("div",{className:"dg-split",role:"separator","aria-orientation":"vertical",onMouseDown:n=>{n.preventDefault();let a=n.clientX,o=t.width;t.onDragging?.(!0);let r=g=>{t.setWidth(Math.max(t.min,Math.min(t.max,o+g.clientX-a)))},m=()=>{t.onDragging?.(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",m)};window.addEventListener("mousemove",r),window.addEventListener("mouseup",m)}})}function Fe(t){let e=t.color&&t.color!=="default"?` dg-tag-${t.color} ant-tag-${t.color}`:"";return(0,T.jsxs)("span",{className:`dg-tag ant-tag${e}${t.bordered===!1?" ant-tag-borderless":""}${t.className?` ${t.className}`:""}`,style:t.style,onClick:t.onClick,children:[t.icon?(0,T.jsx)(k,{name:t.icon,size:11}):null,t.children]})}function Ct(t){return t.status||t.text?(0,T.jsxs)("span",{className:`dg-badge-status ant-badge ant-badge-status${t.className?` ${t.className}`:""}`,children:[(0,T.jsx)("span",{className:`dg-badge-status-dot ant-badge-status-dot dg-badge-status-${t.status??"default"} ant-badge-status-${t.status??"default"}`}),t.text?(0,T.jsx)("span",{className:"dg-badge-status-text ant-badge-status-text",children:t.text}):null,t.children]}):(0,T.jsxs)("span",{className:`dg-badge ant-badge${t.className?` ${t.className}`:""}`,children:[t.children,t.count!==void 0?(0,T.jsx)("sup",{className:"ant-badge-count",children:t.count}):null]})}function Gt({status:t}){return(0,T.jsx)("span",{className:`dg-dot${t==="open"?" dg-dot-open ant-badge-status-success":t==="error"?" dg-dot-error ant-badge-status-error":t==="opening"?" dg-dot-busy ant-badge-status-processing":" ant-badge-status-default"}`})}function Tt(t){let e=t.type??"info",n=t.children??t.message;if(!n)return null;let a=e==="error"||e==="warning"?"alert":e==="success"?"check":"info";return(0,T.jsxs)("div",{className:`dg-banner ant-alert dg-banner-${e} ant-alert-${e}${t.description?" ant-alert-with-description":""}${t.className?` ${t.className}`:""}`,style:t.style,role:"alert",children:[t.showIcon!==!1?(0,T.jsx)("span",{className:"ant-alert-icon",children:(0,T.jsx)(k,{name:a,size:t.description?16:14})}):null,(0,T.jsxs)("div",{className:"ant-alert-content",children:[(0,T.jsx)("div",{className:"dg-banner-text ant-alert-message",children:n}),t.description?(0,T.jsx)("div",{className:"ant-alert-description",children:t.description}):null]}),t.closable||t.onClose?(0,T.jsx)("button",{type:"button",className:"dg-iconbtn dg-iconbtn-tiny ant-alert-close-icon",onClick:t.onClose,"aria-label":"close",children:(0,T.jsx)(k,{name:"x",size:10})}):null]})}function be(t){return(0,T.jsx)(Tt,{type:t.tone??"info",onClose:t.onClose,children:t.children})}function Yt(t){return(0,T.jsx)("div",{className:`dg-seg ant-segmented${t.size==="sm"?" ant-segmented-sm":""}`,children:(0,T.jsx)("div",{className:"ant-segmented-group",children:t.options.map(e=>(0,T.jsx)("button",{type:"button",className:`ant-segmented-item${e.value===t.value?" dg-seg-on ant-segmented-item-selected":""}`,onClick:()=>t.onChange(e.value),children:e.label},e.value))})})}function we({label:t}){return(0,T.jsxs)("span",{className:"dg-spinner-row ant-spin ant-spin-spinning",children:[(0,T.jsx)("span",{className:"dg-spinner ant-spin-dot","aria-hidden":!0}),t?(0,T.jsx)("span",{className:"ant-spin-text",children:t}):null]})}function he({title:t,hint:e,children:n}){return(0,T.jsxs)("div",{className:"dg-empty ant-empty",children:[(0,T.jsx)("div",{className:"ant-empty-image",children:(0,T.jsx)(k,{name:"database",size:36})}),(0,T.jsx)("div",{className:"dg-empty-title ant-empty-description",children:t}),e?(0,T.jsx)("div",{className:"dg-empty-hint",children:e}):null,n?(0,T.jsx)("div",{className:"ant-empty-footer",children:n}):null]})}function Te(t){let e=(0,Pe.useRef)(null),n=(0,Pe.useRef)(t.onClose);n.current=t.onClose;let a=(0,Pe.useRef)(t.busy);return a.current=t.busy,(0,Pe.useEffect)(()=>{let o=m=>{m.key==="Escape"&&!a.current&&(m.stopPropagation(),n.current())};document.addEventListener("keydown",o);let r=setTimeout(()=>e.current?.focus(),0);return()=>{document.removeEventListener("keydown",o),clearTimeout(r)}},[]),(0,Nt.createPortal)((0,T.jsx)("div",{className:"dg-backdrop ant-modal-root",onMouseDown:o=>{o.target===o.currentTarget&&!t.busy&&t.onClose()},children:(0,T.jsxs)("div",{className:"dg-modal ant-modal",style:{width:`${t.width??560}px`},role:"dialog","aria-modal":"true","aria-label":t.title,children:[(0,T.jsxs)("div",{className:"dg-modal-head ant-modal-header",children:[(0,T.jsxs)("div",{className:"dg-modal-title-wrap ant-modal-title",children:[t.icon?(0,T.jsx)("span",{className:"dg-modal-icon-badge",children:(0,T.jsx)(k,{name:t.icon,size:15})}):null,(0,T.jsxs)("div",{children:[(0,T.jsx)("div",{className:"dg-modal-title",children:t.title}),t.subtitle?(0,T.jsx)("div",{className:"dg-modal-subtitle",children:t.subtitle}):null]})]}),(0,T.jsx)("button",{ref:e,type:"button",className:"dg-iconbtn ant-modal-close",onClick:()=>!t.busy&&t.onClose(),"aria-label":"close",children:(0,T.jsx)(k,{name:"x",size:13})})]}),(0,T.jsx)("div",{className:"dg-modal-body ant-modal-body",children:t.children}),t.footer?(0,T.jsx)("div",{className:"dg-modal-foot ant-modal-footer",children:t.footer}):null]})}),document.body)}function je(t){let e=(0,Pe.useRef)(null);(0,Pe.useEffect)(()=>{let a=r=>{e.current&&!e.current.contains(r.target)&&t.onClose()},o=r=>{r.key==="Escape"&&t.onClose()};return document.addEventListener("mousedown",a),document.addEventListener("keydown",o),()=>{document.removeEventListener("mousedown",a),document.removeEventListener("keydown",o)}},[t.onClose]);let n=t.items.filter(Boolean);return(0,Nt.createPortal)((0,T.jsx)("div",{ref:e,className:"dg-ctxmenu ant-dropdown-menu",role:"menu",style:{left:`${Math.min(t.x,window.innerWidth-200)}px`,top:`${Math.min(t.y,Math.max(8,window.innerHeight-40-n.length*28))}px`},children:n.map((a,o)=>a.separator?(0,T.jsx)("div",{className:"dg-ctxsep ant-dropdown-menu-item-divider"},`sep-${o}`):(0,T.jsxs)("button",{type:"button",role:"menuitem",className:`dg-ctxitem ant-dropdown-menu-item${a.danger?" dg-ctxitem-danger ant-dropdown-menu-item-danger":""}`,disabled:a.disabled,onClick:()=>{t.onClose(),a.disabled||a.onClick?.()},children:[a.icon?(0,T.jsx)(k,{name:a.icon,size:12}):null,a.label,a.hint?(0,T.jsx)("span",{className:"dg-ctxhint",children:a.hint}):null]},`${a.label}-${o}`))}),document.body)}var Zt=`/* Grid panel styles.
 *
 * Built strictly on Ant Design 5.0 specifications while adapting seamlessly
 * to DeepSeek Harness theme tokens and both light and dark modes.
 */

.dg-root,
.dg-backdrop,
.dg-ctxmenu {
  /* -- Ant Design 5.0 Palette & Tokens ------------------------------------ */
  --ant-primary: #1677ff;
  --ant-primary-hover: #4096ff;
  --ant-primary-active: #0958d9;
  --ant-primary-bg: #e6f4ff;
  --ant-primary-border: #91caff;
  --ant-success: #52c41a;
  --ant-success-bg: #f6ffed;
  --ant-success-border: #b7eb8f;
  --ant-warning: #faad14;
  --ant-warning-bg: #fffbe6;
  --ant-warning-border: #ffe58f;
  --ant-error: #ff4d4f;
  --ant-error-bg: #fff2f0;
  --ant-error-border: #ffccc7;

  /* Theme-adaptive surfaces & neutrals */
  --dg-bg: var(--dsw-alias-bg-base, #ffffff);
  --dg-surface: color-mix(in srgb, var(--dsw-alias-label-primary, #000) 2.5%, var(--dsw-alias-bg-base, #fff));
  --dg-surface-2: color-mix(in srgb, var(--dsw-alias-label-primary, #000) 5.5%, var(--dsw-alias-bg-base, #fff));
  --dg-hover: var(--dsw-alias-interactive-bg-hover, color-mix(in srgb, var(--dsw-alias-label-primary, #000) 4%, transparent));
  --dg-pressed: var(--dsw-alias-interactive-bg-active, color-mix(in srgb, var(--dsw-alias-label-primary, #000) 8%, transparent));

  --dg-line: var(--dsw-alias-border-l2, #d9d9d9);
  --dg-line-soft: var(--dsw-alias-border-l1, #f0f0f0);
  --dg-line-cell: color-mix(in srgb, var(--dsw-alias-label-primary, #000) 7%, transparent);
  --dg-zebra: color-mix(in srgb, var(--dsw-alias-label-primary, #000) 2.5%, transparent);

  --dg-text: var(--dsw-alias-label-primary, rgba(0, 0, 0, 0.88));
  --dg-text-2: var(--dsw-alias-label-secondary, rgba(0, 0, 0, 0.65));
  --dg-text-3: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, 0.45));

  --dg-accent: var(--dsw-alias-state-business-primary, var(--ant-primary));
  --dg-accent-soft: rgba(22, 119, 255, 0.08);
  --dg-accent-line: rgba(22, 119, 255, 0.35);

  --dg-error: var(--dsw-alias-state-error-primary, var(--ant-error));
  --dg-success: var(--dsw-alias-state-success-primary, var(--ant-success));
  --dg-warn: var(--dsw-alias-state-warn-primary, var(--ant-warning));
  --dg-error-soft: rgba(255, 77, 79, 0.08);
  --dg-success-soft: rgba(82, 196, 26, 0.08);

  /* Code Syntax Palette */
  --dg-code-plain: var(--shiki-foreground, var(--dg-text));
  --dg-code-keyword: color-mix(in srgb, var(--shiki-token-keyword, #cf1322) 80%, var(--dg-text));
  --dg-code-function: color-mix(in srgb, var(--shiki-token-function, #1d39c4) 80%, var(--dg-text));
  --dg-code-string: color-mix(in srgb, var(--shiki-token-string, #389e0d) 80%, var(--dg-text));
  --dg-code-number: color-mix(in srgb, var(--shiki-token-constant, #0958d9) 80%, var(--dg-text));
  --dg-code-comment: color-mix(in srgb, var(--shiki-token-comment, #8c8c8c) 80%, var(--dg-text));
  --dg-code-operator: color-mix(in srgb, var(--shiki-token-parameter, #d46b08) 80%, var(--dg-text));
  --dg-code-punct: color-mix(in srgb, var(--shiki-token-punctuation, #595959) 80%, var(--dg-text));
  --dg-code-variable: color-mix(in srgb, var(--shiki-token-link, #0958d9) 80%, var(--dg-text));

  /* Ant Design Elevation & Shadows */
  --dg-elev-1: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  --dg-elev-2: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  --dg-mask: rgba(0, 0, 0, 0.45);

  /* Ant Design 5 Geometry */
  --dg-r-xs: 4px;
  --dg-r-sm: 6px;
  --dg-r-md: 8px;
  --dg-r-lg: 12px;
  --dg-r-pill: 999px;

  --dg-sp-1: 2px;
  --dg-sp-2: 4px;
  --dg-sp-3: 8px;
  --dg-sp-4: 12px;
  --dg-sp-5: 16px;
  --dg-sp-6: 24px;

  /* Typography */
  --dg-fs-xs: 12px;
  --dg-fs-sm: 13px;
  --dg-fs-md: 14px;
  --dg-fs-lg: 18px;
  --dg-lh-tight: 1.4;
  --dg-lh-body: 1.5714;
  --dg-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Controls Metrics (Ant Design 5 Height Tokens) */
  --dg-row: 32px;
  --dg-ctl: 32px;
  --dg-ctl-sm: 24px;
  --dg-ctl-lg: 40px;
  --dg-icon-btn: 32px;

  --dg-dur-1: 150ms;
  --dg-dur-2: 200ms;
  --dg-ease: cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dg-root {
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--dg-bg);
  color: var(--dg-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  font-size: var(--dg-fs-md);
  line-height: var(--dg-lh-body);
  overflow: hidden;
  padding-top: var(--dsh-frame-top-clearance, 0px);
  position: relative;
}
.dg-root * { box-sizing: border-box; }
.dg-root button { font: inherit; }

.dg-root :focus-visible,
.dg-backdrop :focus-visible,
.dg-ctxmenu :focus-visible {
  outline: 2px solid var(--ant-primary, #1677ff);
  outline-offset: 1px;
}

.dg-mono { font-family: var(--dg-mono); font-size: 12px; }
.dg-muted { color: var(--dg-text-2); }
.dg-hint { font-size: var(--dg-fs-xs); color: var(--dg-text-2); line-height: var(--dg-lh-tight); }
.dg-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.dg-row { display: flex; align-items: center; gap: var(--dg-sp-3); min-width: 0; }
.dg-spacer { flex: 1; min-width: 0; }

/* shell layout ------------------------------------------------------------- */
.dg-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.dg-tree {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  height: 100%;
  border-right: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  overflow: hidden;
}
.dg-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--dg-bg);
  position: relative;
}

/* toolbar (Ant Design Header/Subbar style) --------------------------------- */
.dg-toolbar {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  padding: 0 var(--dg-sp-5);
  padding-left: max(var(--dg-sp-5), var(--dsh-frame-leading-clearance, 16px));
  min-height: 48px;
  border-bottom: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none;
  flex-wrap: wrap;
  overflow: visible;
}
.dg-toolgroup { display: flex; align-items: center; gap: 4px; }
.dg-toolbar-divider { width: 1px; height: 18px; background: var(--dg-line-soft); margin: 0 var(--dg-sp-3); flex: none; }
.dg-brand { display: flex; align-items: center; gap: var(--dg-sp-3); font-weight: 600; font-size: 14px; white-space: nowrap; margin-right: var(--dg-sp-2); }
.dg-brand-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: var(--dg-r-sm);
  background: var(--ant-primary-bg, #e6f4ff);
  color: var(--ant-primary, #1677ff); flex: none;
}
.dg-brand-title { font-weight: 600; letter-spacing: -0.01em; color: var(--dg-text); font-size: 14px; }

/* buttons (Ant Design 5 Button specification) ------------------------------ */
.dg-btn, .ant-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  height: var(--dg-ctl); padding: 4px 15px;
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  color: var(--dg-text);
  font-size: var(--dg-fs-sm); font-weight: 400; cursor: pointer; white-space: nowrap;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  user-select: none;
}
.dg-btn:hover:not(:disabled), .ant-btn:hover:not(:disabled) {
  border-color: var(--ant-primary-hover, #4096ff);
  color: var(--ant-primary-hover, #4096ff);
  background: var(--dg-bg);
}
.dg-btn:active:not(:disabled), .ant-btn:active:not(:disabled) {
  border-color: var(--ant-primary-active, #0958d9);
  color: var(--ant-primary-active, #0958d9);
}
.dg-btn:disabled, .ant-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

/* Primary Button (AntD Daybreak Blue #1677ff) */
.dg-btn-primary, .ant-btn-primary {
  background: var(--ant-primary, #1677ff);
  border-color: var(--ant-primary, #1677ff);
  color: #fff;
  font-weight: 500;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}
.dg-btn-primary:hover:not(:disabled), .ant-btn-primary:hover:not(:disabled) {
  background: var(--ant-primary-hover, #4096ff);
  border-color: var(--ant-primary-hover, #4096ff);
  color: #fff;
}
.dg-btn-primary:active:not(:disabled), .ant-btn-primary:active:not(:disabled) {
  background: var(--ant-primary-active, #0958d9);
  border-color: var(--ant-primary-active, #0958d9);
  color: #fff;
}

/* Dashed Button */
.dg-btn-dashed, .ant-btn-dashed {
  border-style: dashed;
}

/* Tonal / Soft Blue Button */
.dg-btn-tonal {
  background: var(--ant-primary-bg, #e6f4ff);
  border-color: var(--ant-primary-border, #91caff);
  color: var(--ant-primary, #1677ff);
  font-weight: 500;
  box-shadow: none;
}
.dg-btn-tonal:hover:not(:disabled) {
  background: #bae0ff;
  border-color: #69b1ff;
  color: var(--ant-primary-active, #0958d9);
}

/* Danger Button */
.dg-btn-danger, .ant-btn-danger {
  color: var(--ant-error, #ff4d4f);
  border-color: #ffa39e;
  background: var(--dg-bg);
}
.dg-btn-danger:hover:not(:disabled), .ant-btn-danger:hover:not(:disabled) {
  color: #ff7875;
  border-color: #ff7875;
  background: #fff2f0;
}

/* Ghost / Text Button */
.dg-btn-ghost, .ant-btn-text {
  background: transparent;
  border-color: transparent;
  color: var(--dg-text-2);
  box-shadow: none;
}
.dg-btn-ghost:hover:not(:disabled), .ant-btn-text:hover:not(:disabled) {
  background: var(--dg-hover);
  border-color: transparent;
  color: var(--dg-text);
}

/* Active State */
.dg-btn-active, .ant-btn-active {
  background: var(--ant-primary-bg, #e6f4ff);
  border-color: var(--ant-primary, #1677ff);
  color: var(--ant-primary, #1677ff);
  font-weight: 500;
}

/* Button Sizes */
.dg-btn-sm, .ant-btn-sm {
  height: var(--dg-ctl-sm);
  padding: 0 8px;
  font-size: var(--dg-fs-xs);
  border-radius: var(--dg-r-xs);
}
.dg-btn-lg, .ant-btn-lg {
  height: var(--dg-ctl-lg);
  padding: 6px 18px;
  font-size: 15px;
  border-radius: var(--dg-r-md);
}

.ant-btn-block { width: 100%; }

/* Icon Button (Ant Design icon-only) */
.dg-iconbtn, .ant-btn-icon-only {
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--dg-icon-btn); height: var(--dg-icon-btn); padding: 0;
  border: 1px solid transparent; border-radius: var(--dg-r-sm);
  background: transparent; color: var(--dg-text-2); cursor: pointer; flex: none;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-iconbtn:hover:not(:disabled), .ant-btn-icon-only:hover:not(:disabled) {
  background: var(--dg-hover);
  color: var(--dg-text);
}
.dg-iconbtn-tiny { width: 20px; height: 20px; }

/* forms & inputs (Ant Design 5 Form / Input) ------------------------------- */
.dg-input, .ant-input {
  height: var(--dg-ctl);
  padding: 4px 11px;
  border: 1px solid var(--dg-line);
  border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  color: var(--dg-text);
  font: inherit;
  font-size: var(--dg-fs-sm);
  outline: none;
  min-width: 0;
  box-shadow: none;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-input:hover, .ant-input:hover {
  border-color: var(--ant-primary-hover, #4096ff);
}
.dg-input:focus, .ant-input:focus {
  border-color: var(--ant-primary, #1677ff);
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
}
.dg-input::placeholder, .ant-input::placeholder {
  color: var(--dg-text-3);
}

.dg-textarea, .ant-input-textarea {
  height: auto;
  min-height: 68px;
  padding: 6px 11px;
  line-height: var(--dg-lh-body);
  resize: vertical;
  font-family: var(--dg-mono);
  font-size: var(--dg-fs-sm);
}
textarea.dg-input { height: auto; padding: 6px 11px; resize: vertical; font-family: var(--dg-mono); line-height: var(--dg-lh-body); }

.dg-select, .ant-select {
  height: var(--dg-ctl);
  padding: 4px 28px 4px 11px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238c8c8c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  cursor: pointer;
}

.dg-field, .ant-form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.dg-field-wide { grid-column: 1 / -1; }
.dg-field-label, .ant-form-item-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--dg-text);
  line-height: 1.5;
}
.dg-field-required .dg-field-label::before,
.ant-form-item-required::before {
  content: '*';
  margin-right: 4px;
  color: var(--ant-error, #ff4d4f);
  font-family: SimSun, sans-serif;
  font-size: 14px;
}
.dg-field-hint, .ant-form-item-explain {
  font-size: 12px;
  color: var(--dg-text-2);
  line-height: var(--dg-lh-tight);
}
.dg-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}
.dg-field-wrap {
  width: 100%;
}
.dg-input-affix-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.dg-input-affix-wrapper .dg-input {
  width: 100%;
  padding-right: 80px;
}
.dg-input-suffix-actions {
  position: absolute;
  right: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.dg-input-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--dg-text-3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.dg-input-action-btn:hover {
  color: var(--dg-text);
  background: var(--dg-hover);
}
.dg-btn-inline-clear {
  border: none !important;
  background: transparent !important;
  color: var(--ant-primary, #1677ff) !important;
  font-size: 12px !important;
  padding: 0 4px !important;
  height: 24px !important;
  cursor: pointer;
  box-shadow: none !important;
}
.dg-btn-inline-clear:hover {
  color: var(--ant-primary-hover, #4096ff) !important;
  text-decoration: underline;
}

/* cards (Ant Design 5 Card specification) ---------------------------------- */
.dg-card, .ant-card {
  border: 1px solid var(--dg-line-soft);
  border-radius: var(--dg-r-md);
  background: var(--dg-surface);
  box-shadow: var(--dg-elev-1);
  display: flex;
  flex-direction: column;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;
}
.dg-card-hoverable:hover, .ant-card-hoverable:hover {
  border-color: var(--dg-accent-line);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}
.dg-card-borderless, .ant-card-borderless { border: none; box-shadow: none; }
.dg-card-head, .ant-card-head {
  display: flex; align-items: center; justify-content: space-between;
  min-height: 44px; padding: 0 16px;
  border-bottom: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  font-weight: 600; font-size: 14px; color: var(--dg-text);
}
.dg-card-head-title, .ant-card-head-title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dg-card-extra, .ant-card-extra { font-size: 12px; font-weight: normal; color: var(--ant-primary, #1677ff); margin-left: auto; }
.dg-card-body, .ant-card-body { padding: 16px; flex: 1; }
.dg-card-sm .dg-card-head, .ant-card-small .ant-card-head { min-height: 36px; padding: 0 12px; font-size: 13px; }
.dg-card-sm .dg-card-body, .ant-card-small .ant-card-body { padding: 12px; }

/* Stat card metrics for overview */
.dg-stat-card-inner {
  display: flex;
  align-items: center;
  gap: 14px;
}
.dg-stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  flex: none;
}
.dg-stat-icon-blue { background: #e6f4ff; color: #1677ff; }
.dg-stat-icon-green { background: #f6ffed; color: #52c41a; }
.dg-stat-icon-gold { background: #fffbe6; color: #faad14; }
.dg-stat-icon-purple { background: #f9f0ff; color: #722ed1; }
.dg-card-value {
  font-size: 22px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--dg-text);
  line-height: 1.2;
}
.dg-card-label {
  font-size: 12px;
  color: var(--dg-text-2);
  margin-top: 2px;
}

/* dividers (Ant Design 5 Divider) ------------------------------------------ */
.dg-divider, .ant-divider {
  border-color: var(--dg-line-soft);
  box-sizing: border-box;
}
.dg-divider-horizontal, .ant-divider-horizontal {
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  margin: 16px 0;
  border-top: 1px solid var(--dg-line-soft);
}
.dg-divider-vertical, .ant-divider-vertical {
  position: relative;
  top: -0.06em;
  display: inline-block;
  height: 0.9em;
  margin: 0 8px;
  vertical-align: middle;
  border-top: 0;
  border-left: 1px solid var(--dg-line-soft);
}
.dg-divider-with-text, .ant-divider-with-text {
  display: flex;
  align-items: center;
  border-top: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--dg-text-2);
  white-space: nowrap;
  text-align: center;
}
.dg-divider-with-text::before,
.dg-divider-with-text::after {
  content: '';
  position: relative;
  width: 50%;
  border-top: 1px solid var(--dg-line-soft);
  transform: translateY(50%);
}
.dg-divider-with-text-left::before { width: 5%; }
.dg-divider-with-text-left::after { width: 95%; }
.dg-divider-with-text-right::before { width: 95%; }
.dg-divider-with-text-right::after { width: 5%; }
.dg-divider-inner-text, .ant-divider-inner-text {
  display: inline-block;
  padding: 0 12px;
}
.dg-divider-dashed, .ant-divider-dashed { border-style: dashed; }

/* splitters (Ant Design Layout resizer) ------------------------------------ */
.dg-split {
  width: 7px;
  flex: none;
  cursor: col-resize;
  background: transparent;
  position: relative;
  z-index: 10;
  margin: 0 -3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
}
.dg-split::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3px;
  width: 1px;
  background: var(--dg-line);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-split::after {
  content: '';
  position: relative;
  width: 3px;
  height: 24px;
  border-radius: 2px;
  background: transparent;
  z-index: 2;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-split:hover::before,
.dg-split:focus-visible::before {
  background: var(--ant-primary, #1677ff);
  width: 2px;
  left: 2px;
}
.dg-split:hover::after,
.dg-split:focus-visible::after {
  background: var(--ant-primary, #1677ff);
}

/* tabs (Ant Design 5 Tabs specification) ----------------------------------- */
.dg-tabs, .ant-tabs-nav {
  display: flex;
  align-items: stretch;
  gap: 2px;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  padding: 4px 8px 0;
  flex: none;
  overflow-x: auto;
  scrollbar-width: none;
}
.dg-tabs::-webkit-scrollbar { display: none; }
.dg-tab, .ant-tabs-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px 0 14px;
  border: 1px solid transparent;
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background: transparent;
  color: var(--dg-text-2);
  font-size: var(--dg-fs-sm);
  cursor: pointer;
  white-space: nowrap;
  max-width: 240px;
  position: relative;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-tab:hover, .ant-tabs-tab:hover {
  background: var(--dg-hover);
  color: var(--ant-primary-hover, #4096ff);
}
.dg-tab-active, .ant-tabs-tab-active {
  background: var(--dg-bg);
  color: var(--ant-primary, #1677ff);
  border-color: var(--dg-line);
  font-weight: 600;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
}
.dg-tab-active::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  top: 0;
  height: 2px;
  background: var(--ant-primary, #1677ff);
  border-radius: 0 0 2px 2px;
}
.dg-tab-label { overflow: hidden; text-overflow: ellipsis; }
.dg-tab-close {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; margin-left: 4px;
  border: 0; border-radius: 50%;
  background: transparent; color: var(--dg-text-3); cursor: pointer; flex: none;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-tab-close:hover { background: rgba(0, 0, 0, 0.08); color: var(--dg-text); }

/* dialog line tabs */
.dg-dialog-tabs {
  display: flex; align-items: center; gap: 4px;
  border-bottom: 1px solid var(--dg-line-soft);
  margin-top: 6px; padding: 0 4px;
}
.dg-dialog-tab {
  display: inline-flex; align-items: center; gap: 6px;
  height: 36px; padding: 0 16px;
  border: none; background: transparent;
  color: var(--dg-text-2); font-size: var(--dg-fs-sm); font-weight: 500;
  cursor: pointer; position: relative;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-dialog-tab:hover { color: var(--ant-primary-hover, #4096ff); }
.dg-dialog-tab-active { color: var(--ant-primary, #1677ff); font-weight: 600; }
.dg-dialog-tab-active::after {
  content: ''; position: absolute; bottom: 0; left: 12px; right: 12px;
  height: 2px; background: var(--ant-primary, #1677ff); border-radius: 1px;
}
.dg-tab-dot-badge {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--ant-primary, #1677ff); margin-left: 2px; flex: none;
}
.dg-tab-dot-active { background: var(--ant-success, #52c41a); }
.dg-dialog-tab-body { display: flex; flex-direction: column; }
.dg-tab-panel { display: flex; flex-direction: column; gap: 16px; animation: dg-fade-in 120ms cubic-bezier(0, 0, 0.2, 1); }

/* tags & badges (Ant Design 5 Tag & Badge) --------------------------------- */
.dg-tag, .ant-tag {
  display: inline-flex; align-items: center; gap: 4px;
  height: 22px; padding: 0 7px;
  border-radius: var(--dg-r-xs);
  border: 1px solid var(--dg-line-soft);
  background: var(--dg-surface-2);
  color: var(--dg-text-2);
  font-size: 11px; line-height: 20px; white-space: nowrap;
  font-family: inherit;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-tag-strong {
  background: var(--ant-primary-bg, #e6f4ff);
  border-color: var(--ant-primary-border, #91caff);
  color: var(--ant-primary, #1677ff);
  font-weight: 500;
}
.dg-tag-blue, .ant-tag-blue { background: #e6f4ff; border-color: #91caff; color: #1677ff; }
.dg-tag-green, .ant-tag-green { background: #f6ffed; border-color: #b7eb8f; color: #52c41a; }
.dg-tag-gold, .ant-tag-gold { background: #fffbe6; border-color: #ffe58f; color: #faad14; }
.dg-tag-red, .ant-tag-red { background: #fff2f0; border-color: #ffccc7; color: #ff4d4f; }
.dg-tag-purple, .ant-tag-purple { background: #f9f0ff; border-color: #d3adf7; color: #722ed1; }
.dg-tag-cyan, .ant-tag-cyan { background: #e6fffb; border-color: #87e8de; color: #13c2c2; }
.ant-tag-borderless { border: none; }

.dg-badge, .ant-badge {
  display: inline-flex; align-items: center;
  padding: 0 6px; height: 18px; border-radius: 9px;
  background: var(--dg-surface-2); color: var(--dg-text-2);
  font-size: 11px; font-weight: 500; font-variant-numeric: tabular-nums;
}
.dg-badge-status, .ant-badge-status { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; }
.dg-badge-status-dot, .ant-badge-status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex: none; }
.dg-badge-status-default, .ant-badge-status-default { background: #d9d9d9; }
.dg-badge-status-success, .ant-badge-status-success { background: #52c41a; }
.dg-badge-status-error, .ant-badge-status-error { background: #ff4d4f; }
.dg-badge-status-warning, .ant-badge-status-warning { background: #faad14; }
.dg-badge-status-processing, .ant-badge-status-processing { background: #1677ff; position: relative; }
.dg-badge-status-processing::after, .ant-badge-status-processing::after {
  content: ''; position: absolute; top: -1px; left: -1px; width: 8px; height: 8px;
  border: 1px solid #1677ff; border-radius: 50%;
  animation: ant-status-wave 1.6s infinite ease-in-out;
}
@keyframes ant-status-wave {
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(2.4); opacity: 0; }
}

.dg-dot { width: 6px; height: 6px; border-radius: 50%; background: #d9d9d9; display: inline-block; flex: none; }
.dg-dot-open { background: var(--ant-success, #52c41a); }
.dg-dot-error { background: var(--ant-error, #ff4d4f); }
.dg-dot-busy { background: var(--ant-primary, #1677ff); animation: ant-status-wave 1.6s infinite ease-in-out; }

/* modal (Ant Design 5 Modal) ----------------------------------------------- */
.dg-backdrop, .ant-modal-root {
  position: fixed; inset: 0; z-index: 60;
  display: flex; align-items: center; justify-content: center;
  background: var(--dg-mask);
  backdrop-filter: blur(2px);
  padding: 16px;
  animation: dg-fade-in 140ms cubic-bezier(0, 0, 0.2, 1);
}
@keyframes dg-fade-in { from { opacity: 0; } to { opacity: 1; } }

.dg-modal, .ant-modal {
  display: flex; flex-direction: column; max-height: 88vh;
  width: 100%; max-width: 100%;
  border-radius: var(--dg-r-lg);
  background: var(--dg-bg);
  border: 1px solid var(--dg-line-soft);
  box-shadow: var(--dg-elev-2);
  overflow: hidden;
  animation: dg-scale-up 180ms cubic-bezier(0.1, 0.9, 0.2, 1);
}
@keyframes dg-scale-up { from { opacity: 0; transform: scale(0.96) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.dg-modal-head, .ant-modal-header {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none;
}
.dg-modal-title-wrap { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.dg-modal-icon-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: var(--dg-r-sm);
  background: var(--ant-primary-bg, #e6f4ff);
  color: var(--ant-primary, #1677ff);
  flex: none;
}
.dg-modal-title, .ant-modal-title {
  font-weight: 600; font-size: 16px; color: var(--dg-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dg-modal-subtitle {
  font-size: 12px; color: var(--dg-text-2); margin-top: 2px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dg-modal-body, .ant-modal-body {
  padding: 20px 24px; overflow: auto; min-height: 0;
  display: flex; flex-direction: column; gap: 16px;
}
.dg-modal-foot, .ant-modal-footer {
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
  padding: 12px 24px;
  border-top: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none; flex-wrap: wrap;
}

/* alerts & banners (Ant Design 5 Alert) ------------------------------------ */
.dg-banner, .ant-alert {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 9px 16px;
  margin: 12px 16px 0;
  border-radius: var(--dg-r-md);
  border: 1px solid #91caff;
  background: #e6f4ff;
  color: var(--dg-text);
  font-size: 13px;
  line-height: var(--dg-lh-body);
  flex: none;
}
.ant-alert-icon { flex: none; margin-top: 1px; color: #1677ff; }
.ant-alert-content { flex: 1; min-width: 0; }
.dg-banner-info, .ant-alert-info { background: #e6f4ff; border-color: #91caff; }
.dg-banner-info .ant-alert-icon { color: #1677ff; }

.dg-banner-success, .ant-alert-success { background: #f6ffed; border-color: #b7eb8f; }
.dg-banner-success .ant-alert-icon, .dg-banner-success > svg { color: #52c41a; }

.dg-banner-warning, .ant-alert-warning { background: #fffbe6; border-color: #ffe58f; }
.dg-banner-warning .ant-alert-icon, .dg-banner-warning > svg { color: #faad14; }

.dg-banner-error, .ant-alert-error { background: #fff2f0; border-color: #ffccc7; }
.dg-banner-error .ant-alert-icon, .dg-banner-error > svg { color: #ff4d4f; }

/* empty (Ant Design 5 Empty) ----------------------------------------------- */
.dg-empty, .ant-empty {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; padding: 32px 16px; text-align: center; color: var(--dg-text-3);
  user-select: none;
}
.ant-empty-image { margin-bottom: 8px; opacity: 0.45; color: var(--dg-text-3); }
.dg-empty-title, .ant-empty-description { font-size: 13px; font-weight: 400; color: var(--dg-text-3); line-height: var(--dg-lh-body); }
.dg-empty-hint { font-size: 12px; max-width: 440px; line-height: var(--dg-lh-body); color: var(--dg-text-3); opacity: 0.85; }
.ant-empty-footer, .dg-welcome-actions { display: flex; align-items: center; gap: 8px; margin-top: 16px; flex-wrap: wrap; justify-content: center; }

/* segmented (Ant Design 5 Segmented) --------------------------------------- */
.dg-seg, .ant-segmented {
  display: inline-flex; align-items: center;
  padding: 2px;
  border: 1px solid var(--dg-line-soft);
  border-radius: var(--dg-r-sm);
  background: var(--dg-surface-2);
  user-select: none;
}
.ant-segmented-group { display: flex; align-items: center; gap: 2px; width: 100%; }
.dg-seg button, .ant-segmented-item {
  height: 28px; padding: 0 12px;
  border: 0; border-radius: 4px;
  background: transparent; color: var(--dg-text-2);
  font-size: 12px; font-weight: 400; cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-seg button:hover, .ant-segmented-item:hover { color: var(--dg-text); }
.dg-seg button.dg-seg-on, .ant-segmented-item-selected {
  background: var(--dg-bg);
  color: var(--ant-primary, #1677ff);
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* data grid & table (Ant Design Table specification) ----------------------- */
.dg-content { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; position: relative; }
.dg-subbar {
  display: flex; align-items: center; flex-wrap: wrap; gap: var(--dg-sp-2) var(--dg-sp-3);
  min-height: 38px; padding: 4px 16px;
  border-bottom: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
}
.dg-chip {
  display: inline-flex; align-items: center; gap: 4px;
  height: 20px; padding: 0 8px; border-radius: var(--dg-r-pill);
  background: var(--dg-surface-2); color: var(--dg-text-2);
  font-size: 11px; white-space: nowrap; font-variant-numeric: tabular-nums;
}
.dg-chip b { color: var(--dg-text); font-weight: 600; }

.dg-grid-wrap { flex: 1; min-height: 0; overflow: auto; position: relative; }
.dg-grid { border-collapse: separate; border-spacing: 0; font-size: 13px; min-width: 100%; }
.dg-grid th,
.dg-grid td {
  border-bottom: 1px solid var(--dg-line-soft);
  border-right: 1px solid var(--dg-line-soft);
  padding: 6px 12px;
  height: 32px; text-align: left;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: middle;
}
.dg-grid th {
  position: sticky; top: 0; z-index: 3;
  background: var(--dg-surface-2);
  font-weight: 600; font-size: 12px; color: var(--dg-text);
  cursor: pointer; user-select: none;
  transition: background 0.2s;
}
.dg-grid th:hover { background: var(--dg-hover); }
.dg-grid th.dg-th-sorted { color: var(--ant-primary, #1677ff); }
.dg-grid td { font-family: var(--dg-mono); font-size: 12px; }
.dg-grid td.dg-cell-num { text-align: right; font-variant-numeric: tabular-nums; }
.dg-grid tbody tr:nth-child(even) td { background: var(--dg-zebra); }
.dg-grid tbody tr:hover td { background: var(--dg-hover); }
.dg-grid td.dg-cell-selected,
.dg-grid tbody tr:hover td.dg-cell-selected {
  background: var(--ant-primary-bg, #e6f4ff);
  box-shadow: inset 0 0 0 1px var(--ant-primary, #1677ff);
}
.dg-grid .dg-null { color: var(--dg-text-3); font-style: italic; }
.dg-grid .dg-cell-editing { padding: 0; }
.dg-grid .dg-cell-editing input {
  width: 100%; height: 100%; min-height: 28px;
  border: 1px solid var(--ant-primary, #1677ff); border-radius: var(--dg-r-xs);
  background: var(--dg-bg); color: var(--dg-text);
  font: inherit; padding: 0 8px; outline: none;
}
.dg-grid th.dg-rownum,
.dg-grid td.dg-rownum {
  width: 48px; min-width: 48px; text-align: right;
  color: var(--dg-text-3); font-size: 11px;
  padding-right: 12px; font-family: var(--dg-mono); font-variant-numeric: tabular-nums;
}
.dg-rownum-editable { cursor: pointer; }
.dg-rownum-editable:hover { color: var(--ant-primary, #1677ff); background: var(--ant-primary-bg, #e6f4ff); }
.dg-colkey { display: inline-flex; align-items: center; margin-left: 4px; color: var(--ant-primary, #1677ff); vertical-align: -2px; }
.dg-sortmark { color: var(--ant-primary, #1677ff); font-size: 10px; margin-left: 4px; }
.dg-colresize { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; cursor: col-resize; }
.dg-colresize:hover { background: var(--ant-primary, #1677ff); }

.dg-pager {
  display: flex; align-items: center; gap: 12px;
  padding: 6px 16px;
  border-top: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none; font-size: 12px; color: var(--dg-text-2);
}
.dg-pager .dg-input { height: 24px; width: auto; padding: 0 6px; }

.dg-status {
  display: flex; align-items: center; gap: 16px;
  height: 28px; padding: 0 16px;
  border-top: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none; font-size: 12px; color: var(--dg-text-2);
  overflow: hidden; white-space: nowrap;
}
.dg-status-item { display: inline-flex; align-items: center; gap: 4px; min-width: 0; }
.dg-status b { color: var(--dg-text); font-weight: 600; }

.dg-list { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
.dg-list th {
  position: sticky; top: 0; z-index: 2;
  height: 34px; padding: 0 16px;
  text-align: left; font-weight: 600; font-size: 12px;
  color: var(--dg-text); background: var(--dg-surface-2);
  border-bottom: 1px solid var(--dg-line-soft);
  cursor: pointer; user-select: none; white-space: nowrap;
}
.dg-list td {
  height: 32px; padding: 0 16px;
  border-bottom: 1px solid var(--dg-line-soft);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.dg-list tbody tr { cursor: pointer; transition: background 0.15s; }
.dg-list tbody tr:hover td { background: var(--dg-hover); }
.dg-list tbody tr.dg-row-active td { background: var(--ant-primary-bg, #e6f4ff); }
.dg-list .dg-num { text-align: right; font-variant-numeric: tabular-nums; color: var(--dg-text-2); }
.dg-list-name { display: flex; align-items: center; gap: 8px; }

/* tree navigation pane (Ant Design Tree / Sider) --------------------------- */
.dg-tree { display: flex; flex-direction: column; height: 100%; min-width: 0; flex: 1; background: var(--dg-surface); border-right: 1px solid var(--dg-line-soft); }
.dg-panehead {
  display: flex; align-items: center; gap: 8px;
  height: 38px; padding: 0 12px;
  font-weight: 600; font-size: 13px; color: var(--dg-text);
  border-bottom: 1px solid var(--dg-line-soft); flex: none;
  background: var(--dg-surface);
}
.dg-tree-scroll { flex: 1; overflow: auto; padding: 4px 6px; }
.dg-search {
  display: flex; align-items: center; gap: 6px;
  flex: 1; min-width: 0; height: 28px; padding: 0 8px;
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-search:focus-within { border-color: var(--ant-primary, #1677ff); box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1); }
.dg-search input {
  flex: 1; min-width: 0; height: 100%; border: 0; outline: none; background: transparent;
  color: var(--dg-text); font: inherit; font-size: 12px;
}
.dg-group {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 8px; font-size: 11px; font-weight: 600;
  color: var(--dg-text-3); text-transform: uppercase; letter-spacing: 0.04em;
}
.dg-trow {
  display: flex; align-items: center; gap: 6px;
  height: 28px; padding-right: 8px; border-radius: var(--dg-r-xs);
  cursor: pointer; font-size: 12px; color: var(--dg-text);
  transition: all 0.15s;
  user-select: none;
  white-space: nowrap;
}
.dg-trow:hover { background: var(--dg-hover); }
.dg-trow-active { background: var(--ant-primary-bg, #e6f4ff); color: var(--ant-primary, #1677ff); font-weight: 500; }
.dg-trow-db { font-weight: 500; }
.dg-twist {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; color: var(--dg-text-3); transition: transform 0.2s; flex: none;
}
.dg-twist-open { transform: rotate(90deg); color: var(--dg-text); }
.dg-ticon { display: inline-flex; align-items: center; color: var(--dg-text-2); flex: none; }
.dg-trow-active .dg-ticon { color: var(--ant-primary, #1677ff); }
.dg-tlabel { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.dg-colorbar { width: 3px; height: 14px; border-radius: 2px; flex: none; }

/* engine cards in connection dialog ---------------------------------------- */
.dg-engines {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.dg-engine {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--dg-line-soft);
  border-radius: var(--dg-r-md);
  background: var(--dg-surface);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
}
.dg-engine:hover:not(:disabled) {
  border-color: var(--ant-primary-hover, #4096ff);
  background: var(--dg-surface-2);
}
.dg-engine-active {
  border-color: var(--ant-primary, #1677ff) !important;
  background: var(--ant-primary-bg, #e6f4ff) !important;
  box-shadow: 0 0 0 1px var(--ant-primary, #1677ff);
}
.dg-engine-active .dg-engine-name {
  color: var(--ant-primary, #1677ff);
  font-weight: 600;
}
.dg-engine:disabled { opacity: 0.45; cursor: not-allowed; }
.dg-engine-head { display: flex; align-items: center; gap: 8px; }
.dg-engine-name { font-weight: 500; font-size: 13px; color: var(--dg-text); white-space: nowrap; }
.dg-logo { display: inline-flex; align-items: center; justify-content: center; flex: none; }
.dg-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px; }
.dg-summary { margin: 4px 0; }
.dg-form-section { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--dg-line-soft); padding-top: 14px; }
.dg-colors { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.dg-swatch {
  width: 22px; height: 22px; border-radius: 50%;
  border: 1px solid var(--dg-line); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; padding: 0;
  transition: box-shadow 0.2s;
}
.dg-swatch-none { color: var(--dg-text); }
.dg-swatch-on { box-shadow: 0 0 0 2px var(--dg-bg), 0 0 0 4px var(--ant-primary, #1677ff); }
.dg-checkbox-row { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; }
.dg-tab-placeholder {
  display: flex; align-items: center; gap: 8px; padding: 14px;
  border-radius: var(--dg-r-md); border: 1px dashed var(--dg-line);
  background: var(--dg-surface); color: var(--dg-text-2); font-size: 12px;
}

/* context menus (Ant Design Dropdown menu) --------------------------------- */
.dg-ctxmenu, .ant-dropdown-menu {
  position: fixed; z-index: 80; min-width: 176px; padding: 4px;
  border-radius: var(--dg-r-md);
  background: var(--dg-bg);
  border: 1px solid var(--dg-line-soft);
  box-shadow: var(--dg-elev-2);
}
.dg-ctxitem, .ant-dropdown-menu-item {
  display: flex; align-items: center; gap: 8px;
  width: 100%; height: 32px; padding: 0 12px;
  border: 0; border-radius: 4px; background: transparent;
  color: var(--dg-text); font-size: 13px; cursor: pointer; text-align: left;
  transition: background 0.15s;
}
.dg-ctxitem:hover:not(:disabled), .ant-dropdown-menu-item:hover:not(:disabled) { background: var(--dg-hover); }
.dg-ctxitem:disabled, .ant-dropdown-menu-item:disabled { opacity: 0.45; cursor: default; }
.dg-ctxitem-danger, .ant-dropdown-menu-item-danger { color: var(--ant-error, #ff4d4f); }
.dg-ctxitem-danger:hover:not(:disabled) { background: #fff2f0; }
.dg-ctxhint { margin-left: auto; font-size: 11px; color: var(--dg-text-3); }
.dg-ctxsep, .ant-dropdown-menu-item-divider { height: 1px; margin: 4px 0; background: var(--dg-line-soft); }

/* overview card grid ------------------------------------------------------- */
.dg-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; padding: 16px 20px; }
.dg-section { padding: 4px 20px 20px; display: flex; flex-direction: column; gap: 12px; }
.dg-section-title { font-size: 13px; font-weight: 600; color: var(--dg-text); }

/* workspace binding rows --------------------------------------------------- */
.dg-ws-row {
  border: 1px solid var(--dg-line-soft);
  border-radius: var(--dg-r-md);
  padding: 14px 18px;
  display: flex; flex-direction: column; gap: 12px;
  background: var(--dg-surface);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-ws-row:hover {
  border-color: var(--dg-accent-line);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}
.dg-ws-head { display: flex; align-items: center; gap: 12px; min-width: 0; }
.dg-ws-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 8px;
  background: var(--ant-primary-bg, #e6f4ff); color: var(--ant-primary, #1677ff); flex: none;
}
.dg-ws-title { font-weight: 600; font-size: 14px; color: var(--dg-text); }
.dg-ws-path {
  color: var(--dg-text-2); font-size: 12px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: var(--dg-mono); opacity: 0.85; margin-top: 2px;
}
.dg-status-badge {
  display: inline-flex; align-items: center; gap: 6px;
  height: 22px; padding: 0 8px;
  border-radius: var(--dg-r-xs);
  font-size: 11px; font-weight: 500;
  background: var(--dg-surface-2); color: var(--dg-text-2);
  border: 1px solid var(--dg-line-soft);
  white-space: nowrap; flex: none;
}
.dg-status-badge-ok {
  background: #f6ffed;
  color: #52c41a;
  border-color: #b7eb8f;
}
.dg-tag-accent {
  background: var(--ant-primary-bg, #e6f4ff);
  color: var(--ant-primary, #1677ff);
  border-color: var(--ant-primary-border, #91caff);
}
.dg-ws-form {
  display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 12px 16px; align-items: end; margin-top: 4px;
}
.dg-ws-actions { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; margin-top: 2px; }

/* query categories --------------------------------------------------------- */
.dg-query-category {
  border: 1px solid var(--dg-line-soft);
  border-radius: var(--dg-r-md);
  background: var(--dg-surface);
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}
.dg-query-category-head {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; background: var(--dg-surface-2);
  border-bottom: 1px solid var(--dg-line-soft);
  font-size: 12px; color: var(--dg-text);
}
.dg-query-category-icon { display: inline-flex; align-items: center; color: var(--ant-primary, #1677ff); }
.dg-query-category-title { font-weight: 600; font-size: 13px; color: var(--dg-text); }
.dg-query-category-sep { color: var(--dg-text-3); margin: 0 2px; }
.dg-query-category-db { font-family: var(--dg-mono); font-weight: 500; color: var(--dg-text-2); }

/* spinner (Ant Design Spin) ------------------------------------------------ */
.dg-spinner-row, .ant-spin { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--dg-text-2); }
.dg-spinner, .ant-spin-dot {
  width: 14px; height: 14px;
  border: 2px solid rgba(22, 119, 255, 0.2);
  border-top-color: var(--ant-primary, #1677ff);
  border-radius: 50%;
  animation: dg-spin 0.7s linear infinite;
  flex: none;
}
@keyframes dg-spin { to { transform: rotate(360deg); } }

/* toast notification ------------------------------------------------------- */
.dg-toast {
  position: absolute; right: 20px; bottom: 36px; z-index: 30;
  display: flex; align-items: center; gap: 8px;
  max-width: min(480px, 70%); padding: 10px 16px;
  border-radius: var(--dg-r-md);
  border: 1px solid var(--dg-line-soft);
  background: var(--dg-bg);
  box-shadow: var(--dg-elev-2);
  font-size: 13px;
}
.dg-toast > svg { color: var(--ant-success, #52c41a); flex: none; }
.dg-toast-error > svg { color: var(--ant-error, #ff4d4f); }

/* sql console -------------------------------------------------------------- */
.dg-sql { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.dg-sql-top { display: flex; flex-direction: column; border-bottom: 1px solid var(--dg-line-soft); min-height: 132px; flex: none; }
.dg-editor { display: flex; min-height: 132px; max-height: 46vh; position: relative; flex: 1; }
.dg-editor:focus-within { box-shadow: inset 0 0 0 1px var(--ant-primary, #1677ff); }
.dg-gutter {
  flex: none; width: 40px; padding: 12px 8px 12px 0;
  text-align: right; font-family: var(--dg-mono); font-size: 11px; line-height: 1.6;
  overflow: hidden; user-select: none; border-right: 1px solid var(--dg-line-soft);
  color: var(--dg-text-3);
}
.dg-code { position: relative; flex: 1; min-width: 0; overflow: hidden; }
.dg-hl, .dg-sql-text {
  margin: 0; padding: 12px 14px;
  font-family: var(--dg-mono); font-size: 13px; line-height: 1.6;
  tab-size: 2; white-space: pre; word-wrap: normal;
}
.dg-hl { position: absolute; inset: 0; overflow: auto; color: var(--dg-text); pointer-events: none; scrollbar-width: none; }
.dg-hl::-webkit-scrollbar { display: none; }
.dg-sql-text {
  position: absolute; inset: 0; width: 100%; height: 100%;
  border: 0; outline: none; resize: none; background: transparent; color: transparent;
  -webkit-text-fill-color: transparent; caret-color: var(--dg-text); overflow: auto;
}
.dg-sql-text::selection { background: rgba(22, 119, 255, 0.25); -webkit-text-fill-color: transparent; }

.dg-tok { color: var(--dg-code-plain); }
.dg-tok-keyword { color: var(--dg-code-keyword); font-weight: 600; }
.dg-tok-function { color: var(--dg-code-function); }
.dg-tok-string { color: var(--dg-code-string); }
.dg-tok-number { color: var(--dg-code-number); }
.dg-tok-comment { color: var(--dg-code-comment); font-style: italic; }
.dg-tok-operator { color: var(--dg-code-operator); }
.dg-tok-punct { color: var(--dg-code-punct); }
.dg-tok-variable { color: var(--dg-code-variable); }
.dg-tok-ident { color: var(--dg-code-plain); }

.dg-sqlbar {
  display: flex; align-items: center; gap: 4px 8px;
  padding: 8px 16px; border-top: 1px solid var(--dg-line-soft);
  background: var(--dg-surface); flex: none; flex-wrap: wrap;
}
.dg-complete {
  position: absolute; z-index: 40; min-width: 180px; max-width: 320px; max-height: 220px;
  overflow: auto; padding: 4px; border-radius: var(--dg-r-sm);
  background: var(--dg-bg); border: 1px solid var(--dg-line-soft);
  box-shadow: var(--dg-elev-2); font-family: var(--dg-mono); font-size: 12px;
}
.dg-complete-item { display: flex; align-items: center; gap: 8px; height: 28px; padding: 0 8px; border-radius: 4px; cursor: pointer; white-space: nowrap; }
.dg-complete-item:hover, .dg-complete-item-on { background: var(--ant-primary-bg, #e6f4ff); color: var(--ant-primary, #1677ff); }
.dg-complete-kind { font-size: 11px; color: var(--dg-text-3); margin-left: auto; padding-left: 12px; text-transform: uppercase; }

.dg-rtabs { display: flex; align-items: center; gap: 4px; padding: 4px 12px; border-bottom: 1px solid var(--dg-line-soft); flex: none; overflow-x: auto; background: var(--dg-surface); }
.dg-rtab {
  display: inline-flex; align-items: center; gap: 4px;
  height: 26px; padding: 0 10px; border: 1px solid transparent; border-radius: var(--dg-r-xs);
  background: transparent; color: var(--dg-text-2); font-size: 12px;
  cursor: pointer; white-space: nowrap; transition: all 0.15s;
}
.dg-rtab:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-rtab-active { background: var(--dg-bg); color: var(--ant-primary, #1677ff); border-color: var(--dg-line-soft); font-weight: 500; }

.dg-results { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.dg-sqlmsg { padding: 14px 18px; font-size: 13px; color: var(--dg-text-2); white-space: pre-wrap; overflow-wrap: anywhere; }
.dg-err {
  font-family: var(--dg-mono); font-size: 12px; line-height: var(--dg-lh-body);
  padding: 10px 14px; border-radius: var(--dg-r-sm);
  border-left: 3px solid var(--ant-error, #ff4d4f);
  background: #fff2f0; color: var(--dg-text);
  white-space: pre-wrap; overflow-wrap: anywhere;
}
.dg-pre { margin: 0; font-family: var(--dg-mono); font-size: 12px; line-height: var(--dg-lh-body); white-space: pre-wrap; overflow-wrap: anywhere; color: var(--dg-text); }

/* structure view ----------------------------------------------------------- */
.dg-struct { flex: 1; min-height: 0; display: flex; overflow: hidden; }
.dg-struct-col { flex: 1; min-width: 0; display: flex; flex-direction: column; border-right: 1px solid var(--dg-line-soft); }
.dg-struct-col:last-child { border-right: 0; }
.dg-struct-col-fields { flex: 1.6 1 0; }
.dg-struct-col-indexes { flex: 0.85 1 0; }
.dg-struct-col-ddl { flex: 1.55 1 0; }
.dg-grid-fixed { table-layout: fixed; }
.dg-struct-head {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; font-size: 12px; font-weight: 600;
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--dg-text-2);
  border-bottom: 1px solid var(--dg-line-soft); flex: none; background: var(--dg-surface-2);
}
.dg-struct-body { flex: 1; min-height: 0; overflow: auto; padding: 12px 14px; }
.dg-idx { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 12px; flex-wrap: wrap; border-bottom: 1px solid var(--dg-line-cell); }

/* redis view --------------------------------------------------------------- */
.dg-redis { flex: 1; min-height: 0; display: flex; }
.dg-redis-list {
  width: 300px; flex: none; display: flex; flex-direction: column;
  border-right: 1px solid var(--dg-line-soft);
  min-width: 0; background: var(--dg-surface);
}
.dg-redis-keys { flex: 1; min-height: 0; overflow: auto; padding: 6px 8px; }
.dg-rkey {
  display: flex; align-items: center; gap: 8px;
  height: 28px; padding: 0 8px; border-radius: var(--dg-r-xs);
  cursor: pointer; font-size: 12px; font-family: var(--dg-mono);
  transition: all 0.15s;
}
.dg-rkey:hover { background: var(--dg-hover); }
.dg-rkey-active { background: var(--ant-primary-bg, #e6f4ff); color: var(--ant-primary, #1677ff); font-weight: 500; }
.dg-rns { display: flex; align-items: center; gap: 8px; height: 26px; padding: 0 8px; cursor: pointer; font-size: 12px; color: var(--dg-text-2); font-weight: 600; border-radius: var(--dg-r-xs); }
.dg-rns:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-redis-detail { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.dg-redis-console { border-top: 1px solid var(--dg-line-soft); flex: none; padding: 10px 16px; display: flex; flex-direction: column; gap: 8px; background: var(--dg-surface); }

/* responsive layout -------------------------------------------------------- */
@media (max-width: 720px) {
  .dg-ws-form { grid-template-columns: minmax(0, 1fr); }
  .dg-form { grid-template-columns: minmax(0, 1fr); }
  .dg-backdrop { padding: 8px; }
}

@media (prefers-reduced-motion: reduce) {
  .dg-root *,
  .dg-backdrop *,
  .dg-ctxmenu * {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;var Ne=require("react");var p=require("react/jsx-runtime"),Ln={mysql:{color:"#00758f",glyph:"cylinder"},postgres:{color:"#336791",glyph:"cylinder"},sqlite:{color:"#0f80cc",glyph:"file"},sqlserver:{color:"#cc2927",glyph:"cylinder"},redis:{color:"#dc382d",glyph:"layers"}},Hn=[{value:"none",color:"var(--dsw-alias-border-l2)"},{value:"green",color:"var(--dsw-alias-state-success-primary)"},{value:"yellow",color:"var(--dsw-alias-state-warn-primary)"},{value:"red",color:"var(--dsw-alias-state-error-primary)"}];function Bn({engine:t,size:e=20}){let n=Ln[t]??{color:"#1677ff",glyph:"cylinder"},a=n.glyph==="layers"?"M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5":n.glyph==="file"?"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8":"M21 5c0 1.66-4.03 3-9 3S3 6.66 3 5s4.03-3 9-3 9 1.34 9 3z M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5 M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3";return(0,p.jsx)("span",{className:"dg-logo",style:{width:e,height:e,color:n.color},"aria-hidden":!0,children:(0,p.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",children:(0,p.jsx)("path",{d:a})})})}function tt(t){let{t:e,draft:n,hasSaved:a,disabled:o}=t,[r,m]=(0,Ne.useState)(!1),g=n.clear?e("secretClearPending"):a?e("secretKeep"):void 0;return(0,p.jsx)("div",{className:"dg-field-wrap",children:(0,p.jsxs)(oe,{label:t.label,required:t.required,hint:g,children:[(0,p.jsxs)("div",{className:"dg-input-affix-wrapper",children:[t.multiline?(0,p.jsx)(et,{"aria-label":t.label,value:n.value,onChange:u=>t.onChange(u.target.value),rows:4,autoComplete:"off",spellCheck:!1,disabled:o,placeholder:t.placeholder??"\u2014"}):(0,p.jsx)(ie,{"aria-label":t.label,type:r?"text":"password",value:n.value,onChange:u=>t.onChange(u.target.value),autoComplete:"new-password",disabled:o,placeholder:n.clear?e("secretClearPending"):a?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":t.placeholder??(t.required?"":e("optional"))}),(0,p.jsxs)("div",{className:"dg-input-suffix-actions",children:[!t.multiline&&(n.value||a)?(0,p.jsx)("button",{type:"button",className:"dg-input-action-btn",title:r?"Hide password":"Show password",onClick:()=>m(!r),tabIndex:-1,children:(0,p.jsx)(k,{name:r?"eyeOff":"eye",size:13})}):null,a?(0,p.jsx)("button",{type:"button",className:"dg-btn-inline-clear ant-btn ant-btn-link",disabled:o,onClick:()=>t.onClear(!n.clear),children:n.clear?e("secretUndoClear"):e("secretClear")}):null]})]}),t.hint?(0,p.jsx)("div",{className:"dg-field-hint",children:t.hint}):null]})})}function en(t){let{t:e,engines:n}=t,a=t.initial,[o,r]=(0,Ne.useState)(a?.engine??"sqlite"),[m,g]=(0,Ne.useState)("general"),[u,b]=(0,Ne.useState)(()=>({name:a?.name??"",group:a?.group??"",host:a?.host||"127.0.0.1",port:a?.port?String(a.port):"",user:a?.user??"",database:a?.database??"",file:a?.file??"",redisDb:String(a?.redisDb??0),sslMode:a?.sslMode??"disable",tlsServerName:a?.tlsServerName??"",color:a?.color??"none"})),[w,L]=(0,Ne.useState)(()=>({enabled:a?.ssh?.enabled===!0,host:a?.ssh?.host??"",port:String(a?.ssh?.port??22),username:a?.ssh?.username??"",authType:a?.ssh?.authType??"password",hostFingerprint:a?.ssh?.hostFingerprint??""})),[$,N]=(0,Ne.useState)(()=>({password:{value:"",clear:!1},sshPassword:{value:"",clear:!1},privateKey:{value:"",clear:!1},passphrase:{value:"",clear:!1}})),[O,R]=(0,Ne.useState)(null),[B,H]=(0,Ne.useState)(!1),[E,j]=(0,Ne.useState)(!1),[ee,Q]=(0,Ne.useState)(""),se=n.find(v=>v.id===o),W=o!=="sqlite"&&se?.kind!=="file",G=B||E,ne=v=>J=>b(f=>({...f,[v]:J.target.value})),P=v=>J=>L(f=>({...f,[v]:J.target.value})),M=(v,J)=>N(f=>({...f,[v]:{value:J,clear:!1}})),Y=(v,J)=>N(f=>({...f,[v]:{value:"",clear:J}})),I=(v,J)=>({t:e,draft:$[v],hasSaved:J,disabled:G,onChange:f=>M(v,f),onClear:f=>Y(v,f)}),te=v=>{L(J=>({...J,authType:v})),N(J=>v==="password"?{...J,privateKey:{value:"",clear:!0},passphrase:{value:"",clear:!0}}:{...J,sshPassword:{value:"",clear:!0}})},_=()=>{let v="";return W&&o==="sqlserver"&&u.sslMode==="verify-ca"?(v=e("sqlserverVerifyCaUnsupported"),g("ssl")):W&&w.enabled&&(!w.host.trim()||!w.username.trim()||!["password","privateKey"].includes(w.authType)?(v=e("sshFieldsRequired"),g("ssh")):!/^\d+$/.test(w.port)||Number(w.port)<1||Number(w.port)>65535?(v=e("sshPortInvalid"),g("ssh")):/^SHA256:[A-Za-z0-9+/]{43}=?$/.test(w.hostFingerprint.trim())||(v=e("sshFingerprintInvalid"),g("ssh"))),Q(v),v&&R(null),!v},le=()=>{let v={name:u.name.trim(),engine:o,group:u.group.trim(),host:u.host.trim(),port:Number.parseInt(u.port,10)||se?.defaultPort||0,user:u.user.trim(),database:u.database.trim(),file:u.file.trim(),redisDb:Number.parseInt(u.redisDb,10)||0,sslMode:u.sslMode,color:u.color};if(W)if(v.tlsServerName=u.tlsServerName.trim(),($.password.value!==""||$.password.clear)&&(v.password=$.password.value),w.enabled){let J={enabled:!0,host:w.host.trim(),port:Number(w.port),username:w.username.trim(),authType:w.authType,hostFingerprint:w.hostFingerprint.trim()};w.authType==="password"?(($.sshPassword.value!==""||$.sshPassword.clear)&&(J.password=$.sshPassword.value),$.privateKey.clear&&(J.privateKey=""),$.passphrase.clear&&(J.passphrase="")):(($.privateKey.value!==""||$.privateKey.clear)&&(J.privateKey=$.privateKey.value),($.passphrase.value!==""||$.passphrase.clear)&&(J.passphrase=$.passphrase.value),$.sshPassword.clear&&(J.password="")),v.ssh=J}else v.ssh={enabled:!1};else v.ssh={enabled:!1};return v},me=async()=>{if(_()){H(!0),R(null),Q("");try{let v=await U.testDraft(le(),a?.id);R({ok:!0,text:fe(e("testOk"),{version:v.serverVersion??"",ms:v.latencyMs??0})})}catch(v){R({ok:!1,text:fe(e("testFailed"),{error:v instanceof Error?v.message:String(v)})})}finally{H(!1)}}},ye=async()=>{if(_()){j(!0),Q("");try{await t.onSave(le())}catch(v){Q(v instanceof Error?v.message:String(v)),j(!1)}}};return(0,p.jsxs)(Te,{icon:"database",title:e(a?"edit":"newConnection"),onClose:t.onClose,busy:G,width:600,footer:(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",width:"100%",gap:8},children:[(0,p.jsxs)(K,{onClick:()=>{me()},disabled:G,children:[B?(0,p.jsx)(we,{}):null,e("test")]}),O?.text?(0,p.jsxs)("span",{className:O.ok?"dg-tag dg-tag-green":"dg-tag dg-tag-red",style:{maxWidth:250,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:O.text,children:[(0,p.jsx)(k,{name:O.ok?"check":"alert",size:11}),O.text]}):null,(0,p.jsx)("div",{style:{flex:1}}),(0,p.jsx)(K,{onClick:t.onClose,disabled:G,children:e("cancel")}),(0,p.jsxs)(K,{variant:"primary",onClick:()=>{ye()},disabled:G,children:[E?(0,p.jsx)(we,{}):null,e("save")]})]}),children:[(0,p.jsx)("div",{className:"dg-engines",children:n.map(v=>(0,p.jsxs)("button",{type:"button",className:`dg-engine${v.id===o?" dg-engine-active":""}`,onClick:()=>{v.id!==o&&(r(v.id),b(J=>({...J,port:String(v.defaultPort||""),sslMode:"disable"})),R(null),v.kind==="file"&&g("general"))},children:[(0,p.jsx)(Bn,{engine:v.id,size:20}),(0,p.jsx)("span",{className:"dg-engine-name",children:v.label})]},v.id))}),W?(0,p.jsxs)("div",{className:"dg-dialog-tabs",role:"tablist",children:[(0,p.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-general","aria-selected":m==="general","aria-controls":"tab-pane-general",className:`dg-dialog-tab${m==="general"?" dg-dialog-tab-active":""}`,onClick:()=>g("general"),children:[(0,p.jsx)(k,{name:"database",size:13}),(0,p.jsx)("span",{children:e("tabGeneral")})]}),(0,p.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-ssh","aria-selected":m==="ssh","aria-controls":"tab-pane-ssh",className:`dg-dialog-tab${m==="ssh"?" dg-dialog-tab-active":""}`,onClick:()=>g("ssh"),children:[(0,p.jsx)(k,{name:"link",size:13}),(0,p.jsx)("span",{children:e("sshSection")}),w.enabled?(0,p.jsx)("span",{className:"dg-tab-dot-badge dg-tab-dot-active"}):null]}),(0,p.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-ssl","aria-selected":m==="ssl","aria-controls":"tab-pane-ssl",className:`dg-dialog-tab${m==="ssl"?" dg-dialog-tab-active":""}`,onClick:()=>g("ssl"),children:[(0,p.jsx)(k,{name:"shield",size:13}),(0,p.jsx)("span",{children:e("tabSsl")}),u.sslMode!=="disable"?(0,p.jsx)("span",{className:"dg-tab-dot-badge dg-tab-dot-active"}):null]})]}):null,(0,p.jsxs)("div",{className:"dg-dialog-tab-body",children:[(0,p.jsx)("div",{role:"tabpanel",id:"tab-pane-general","aria-labelledby":"tab-btn-general",className:"dg-tab-panel",style:{display:m==="general"?"flex":"none"},children:(0,p.jsxs)("div",{className:"dg-form",children:[(0,p.jsx)(oe,{label:e("name"),required:!0,children:(0,p.jsx)(ie,{value:u.name,onChange:ne("name"),placeholder:se?.label??"Connection Name"})}),se?.kind==="file"?(0,p.jsx)(oe,{label:e("file"),required:!0,hint:"e.g. D:\\\\data\\\\app.db",children:(0,p.jsx)(ie,{value:u.file,onChange:ne("file"),placeholder:"C:/data/app.db"})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(oe,{label:e("host"),required:!0,hint:w.enabled?e("sshDatabaseHostHint"):void 0,children:(0,p.jsx)(ie,{value:u.host,onChange:ne("host"),placeholder:"127.0.0.1"})}),(0,p.jsx)(oe,{label:e("port"),required:!0,children:(0,p.jsx)(ie,{value:u.port,onChange:ne("port"),placeholder:String(se?.defaultPort??"")})}),(0,p.jsx)(oe,{label:e("user"),required:o!=="redis",children:(0,p.jsx)(ie,{value:u.user,onChange:ne("user"),placeholder:o==="redis"?e("optional"):"root"})}),(0,p.jsx)(tt,{label:e("password"),...I("password",a?.hasPassword??!1),placeholder:e("optional")}),o==="redis"?(0,p.jsx)(oe,{label:e("redisDb"),children:(0,p.jsx)(ie,{value:u.redisDb,onChange:ne("redisDb"),inputMode:"numeric",placeholder:"0"})}):(0,p.jsx)(oe,{label:e("database"),hint:e("optional"),children:(0,p.jsx)(ie,{value:u.database,onChange:ne("database"),placeholder:e("optional")})})]}),(0,p.jsx)(oe,{label:e("group"),hint:e("optional"),children:(0,p.jsx)(ie,{value:u.group,onChange:ne("group"),placeholder:"dev / staging / prod"})}),(0,p.jsxs)("div",{className:"dg-field ant-form-item",children:[(0,p.jsx)("span",{className:"dg-field-label ant-form-item-label",children:e("color")}),(0,p.jsx)("div",{className:"dg-colors",children:Hn.map(v=>(0,p.jsx)("button",{type:"button",className:`dg-swatch${v.value==="none"?" dg-swatch-none":""}${u.color===v.value?" dg-swatch-on":""}`,style:{background:v.color},title:v.value,"aria-label":v.value,"aria-pressed":u.color===v.value,onClick:()=>b(J=>({...J,color:v.value})),children:u.color===v.value?(0,p.jsx)(k,{name:"check",size:10}):null},v.value))})]})]})}),W?(0,p.jsx)("div",{role:"tabpanel",id:"tab-pane-ssh","aria-labelledby":"tab-btn-ssh",className:"dg-tab-panel",style:{display:m==="ssh"?"flex":"none"},children:(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[(0,p.jsxs)("label",{className:"dg-field-label dg-checkbox-row",children:[(0,p.jsx)("input",{type:"checkbox",checked:w.enabled,disabled:G,onChange:v=>{L(J=>({...J,enabled:v.target.checked})),R(null)}}),(0,p.jsx)("span",{style:{fontWeight:600},children:e("sshEnable")}),(0,p.jsx)("span",{className:`dg-tag${w.enabled?" dg-tag-strong":""}`,children:w.enabled?"Active":"Off"})]}),w.enabled?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{className:"dg-field-hint",children:e("sshSingleHopHint")}),(0,p.jsxs)("div",{className:"dg-form",children:[(0,p.jsx)(oe,{label:e("sshHost"),required:!0,children:(0,p.jsx)(ie,{value:w.host,onChange:P("host"),required:!0,disabled:G,autoComplete:"off",placeholder:"jump.example.com"})}),(0,p.jsx)(oe,{label:e("sshPort"),required:!0,children:(0,p.jsx)(ie,{value:w.port,onChange:P("port"),required:!0,inputMode:"numeric",disabled:G,placeholder:"22"})}),(0,p.jsx)(oe,{label:e("sshUsername"),required:!0,children:(0,p.jsx)(ie,{value:w.username,onChange:P("username"),required:!0,disabled:G,autoComplete:"off",placeholder:"deploy"})}),(0,p.jsx)(oe,{label:e("sshAuthType"),required:!0,children:(0,p.jsxs)(ke,{value:w.authType,disabled:G,required:!0,onChange:v=>te(v.target.value),children:[(0,p.jsx)("option",{value:"password",children:e("sshAuthPassword")}),(0,p.jsx)("option",{value:"privateKey",children:e("sshAuthPrivateKey")})]})}),(0,p.jsx)(oe,{label:e("sshHostFingerprint"),required:!0,hint:e("sshFingerprintHint"),children:(0,p.jsx)(ie,{value:w.hostFingerprint,onChange:P("hostFingerprint"),placeholder:"SHA256:\u2026",required:!0,disabled:G,autoComplete:"off",spellCheck:!1})}),w.authType==="password"?(0,p.jsx)(tt,{label:e("sshPassword"),required:!0,...I("sshPassword",a?.ssh?.hasPassword??!1)}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(tt,{label:e("sshPrivateKey"),multiline:!0,required:!0,hint:e("sshPrivateKeyHint"),placeholder:"-----BEGIN OPENSSH PRIVATE KEY-----",...I("privateKey",a?.ssh?.hasPrivateKey??!1)}),(0,p.jsx)(tt,{label:e("sshPassphrase"),hint:e("optional"),placeholder:e("optional"),...I("passphrase",a?.ssh?.hasPassphrase??!1)})]})]}),(0,p.jsx)(be,{children:e("sshSecurityHint")})]}):a?.ssh?(0,p.jsx)("div",{className:"dg-field-hint",children:e("sshDisableHint")}):(0,p.jsxs)("div",{className:"dg-tab-placeholder",children:[(0,p.jsx)(k,{name:"link",size:16}),(0,p.jsx)("span",{children:e("sshSingleHopHint")})]})]})}):null,W?(0,p.jsx)("div",{role:"tabpanel",id:"tab-pane-ssl","aria-labelledby":"tab-btn-ssl",className:"dg-tab-panel",style:{display:m==="ssl"?"flex":"none"},children:(0,p.jsxs)("div",{className:"dg-form",children:[(0,p.jsx)(oe,{label:"TLS / SSL",required:!0,hint:o==="sqlserver"?e("sqlserverVerifyCaUnsupported"):void 0,children:(0,p.jsxs)(ke,{value:u.sslMode,onChange:v=>b(J=>({...J,sslMode:v.target.value})),children:[(0,p.jsx)("option",{value:"disable",children:e("sslDisable")}),(0,p.jsx)("option",{value:"require",children:e("sslRequire")}),(0,p.jsx)("option",{value:"verify-ca",disabled:o==="sqlserver",children:e("sslVerifyCa")}),(0,p.jsx)("option",{value:"verify-full",children:e("sslVerifyFull")})]})}),u.sslMode!=="disable"?(0,p.jsx)(oe,{label:e("tlsServerName"),hint:e("tlsServerNameHint"),children:(0,p.jsx)(ie,{value:u.tlsServerName,onChange:ne("tlsServerName"),placeholder:u.host.trim()})}):null]})}):null]}),ee?(0,p.jsx)(be,{tone:"error",onClose:()=>Q(""),children:ee}):null]})}var nt=require("react");var Z=require("react/jsx-runtime");function tn(t){let{t:e,store:n}=t,a=ve(n.meta),o=ve(n.connections),[r,m]=(0,nt.useState)({}),[g,u]=(0,nt.useState)(""),[b,w]=(0,nt.useState)(""),L=a.meta?.workspaces??[],$=a.meta?.bindings??[],N=E=>$.find(j=>j.workspaceId===E),O=E=>{let j=N(E);return r[E]??{connectionId:j?.connectionId??"",database:j?.database??""}},R=(E,j)=>m(ee=>({...ee,[E]:{...O(E),...j}})),B=async(E,j)=>{let ee=O(E);if(!ee.connectionId)return w(e("selectConnection"));u(E),w("");try{await U.bindProject({workspaceId:E,workspacePath:j,connectionId:ee.connectionId,database:ee.database}),await n.meta.load();let se=o.items.find(P=>P.id===ee.connectionId)?.name||ee.connectionId,W=ee.database?` (${ee.database})`:"",ne=e("projectBound").replace("{name}",se).replace("\uFF08{database}\uFF09",W).replace("({database})",W).replace("{database}",ee.database||"");t.notify(ne,"success")}catch(Q){w(Q instanceof Error?Q.message:String(Q))}finally{u("")}},H=async E=>{u(E);try{await U.unbindProject(E),await n.meta.load(),t.notify(e("unbindProject")+" \u2713","info")}catch(j){w(j instanceof Error?j.message:String(j))}finally{u("")}};return(0,Z.jsxs)(Te,{icon:"link",title:e("workspaces"),subtitle:e("agentHint"),onClose:t.onClose,width:680,footer:(0,Z.jsx)(K,{onClick:t.onClose,children:e("close")}),children:[b?(0,Z.jsx)(Tt,{type:"error",message:b,closable:!0,onClose:()=>w(""),style:{marginBottom:12}}):null,L.length===0?(0,Z.jsx)(he,{title:e("noWorkspaces")}):(0,Z.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:12,maxHeight:"60vh",overflow:"auto",padding:"2px 0"},children:L.map(E=>{let j=N(E.id),ee=O(E.id),Q=o.items.find(W=>W.id===ee.connectionId),se=ee.connectionId?n.connections.session(ee.connectionId).databases:[];return(0,Z.jsxs)(Re,{size:"small",hoverable:!0,className:"dg-ws-card",children:[(0,Z.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:10},children:[(0,Z.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,minWidth:0,flex:1},children:[(0,Z.jsx)("span",{className:"dg-ws-icon",children:(0,Z.jsx)(k,{name:"folder",size:15})}),(0,Z.jsxs)("div",{style:{minWidth:0,flex:1},children:[(0,Z.jsx)("div",{style:{fontWeight:600,fontSize:13,color:"var(--dg-text)"},children:E.title}),(0,Z.jsx)("div",{style:{fontSize:12,color:"var(--dg-text-2)",fontFamily:"var(--dg-mono)",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",marginTop:2},title:E.path,children:E.path})]})]}),j?(0,Z.jsx)(Ct,{status:"success",text:(0,Z.jsx)("span",{style:{fontWeight:500,color:"var(--ant-success, #52c41a)"},children:e("boundProject")})}):(0,Z.jsx)(Ct,{status:"default",text:(0,Z.jsx)("span",{style:{color:"var(--dg-text-3)"},children:e("projectUnbound")})})]}),j?(0,Z.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:12},children:[(0,Z.jsx)(Fe,{color:"blue",icon:"database",children:j.connectionName||j.connectionId}),j.database?(0,Z.jsx)(Fe,{color:"cyan",children:j.database}):null,(0,Z.jsx)(Fe,{color:"purple",children:e("readOnlyForAgent")})]}):null,(0,Z.jsxs)("div",{className:"dg-ws-form",children:[(0,Z.jsx)(oe,{label:e("connections"),children:(0,Z.jsxs)(ke,{value:ee.connectionId,onChange:W=>{let G=W.target.value,ne=o.items.find(P=>P.id===G);R(E.id,{connectionId:G,database:ne?.database||""})},children:[(0,Z.jsx)("option",{value:"",children:"\u2014"}),o.items.map(W=>(0,Z.jsxs)("option",{value:W.id,children:[W.name," \xB7 ",W.engine]},W.id))]})}),(0,Z.jsx)(oe,{label:e("database"),children:se.length>0?(0,Z.jsxs)(ke,{value:ee.database,onChange:W=>R(E.id,{database:W.target.value}),children:[(0,Z.jsx)("option",{value:"",children:Q?.database?`${Q.database} (default)`:"\u2014"}),se.map(W=>(0,Z.jsx)("option",{value:W.name,children:W.name},W.name))]}):(0,Z.jsx)(ie,{value:ee.database,placeholder:Q?.database||"optional",onChange:W=>R(E.id,{database:W.target.value})})}),(0,Z.jsxs)("div",{className:"dg-ws-actions",children:[(0,Z.jsxs)(K,{size:"sm",variant:"primary",disabled:g===E.id||!ee.connectionId,loading:g===E.id,onClick:()=>{B(E.id,E.path)},children:[(0,Z.jsx)(k,{name:"link",size:11}),e("bindProject")]}),j?(0,Z.jsx)(K,{size:"sm",variant:"danger",disabled:g===E.id,onClick:()=>{H(E.id)},children:e("unbindProject")}):null]})]})]},E.id)})})]})}var Se=require("react");var s=require("react/jsx-runtime");function nn(t){let{t:e,store:n}=t,a=ve(n.catalog),o=`${t.connectionId}|${t.database}|${t.schema}`,[r,m]=(0,Se.useState)(""),[g,u]=(0,Se.useState)({column:"name",dir:"asc"});(0,Se.useEffect)(()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let b=(0,Se.useMemo)(()=>{let N=r.trim().toLowerCase();return(a.relations[o]??[]).filter(R=>R.kind===t.kind).filter(R=>N?R.name.toLowerCase().includes(N):!0).sort((R,B)=>{let H=g.dir==="desc"?-1:1;return g.column==="rows"?((R.rows??0)-(B.rows??0))*H:g.column==="comment"?(R.comment||"").localeCompare(B.comment||"")*H:R.name.localeCompare(B.name)*H})},[a.relations,o,r,t.kind,g]),w=a.loading[o]===!0,L=a.errors[o]??"",$=(N,O,R)=>(0,s.jsxs)("th",{className:R,onClick:()=>u(B=>B.column===N?{column:N,dir:B.dir==="asc"?"desc":"asc"}:{column:N,dir:"asc"}),children:[O,g.column===N?(0,s.jsx)("span",{className:"dg-sortmark",children:g.dir==="desc"?"\u25BC":"\u25B2"}):null]});return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(k,{name:t.kind==="view"?"view":"table",size:12}),(0,s.jsx)("span",{children:t.kind==="view"?e("views"):e("tables")}),(0,s.jsx)("span",{className:"dg-chip",children:b.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(ie,{value:r,placeholder:e("search"),style:{width:180},onChange:N=>m(N.target.value)}),t.onNewQuery?(0,s.jsxs)(K,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,s.jsx)(k,{name:"play",size:10}),e("newQuery")]}):null,(0,s.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema,!0)}})]}),L?(0,s.jsx)(be,{tone:"error",children:L}):null,(0,s.jsx)("div",{className:"dg-grid-wrap",children:w?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):b.length===0?(0,s.jsx)(he,{title:e("emptyTables")}):(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[$("name",e("name")),$("rows",e("rows"),"dg-num"),$("comment",e("comment")),(0,s.jsx)("th",{style:{width:70}})]})}),(0,s.jsx)("tbody",{children:b.map(N=>(0,s.jsxs)("tr",{onDoubleClick:()=>t.onOpen(N),children:[(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-list-name",children:[(0,s.jsx)(k,{name:N.kind==="view"?"view":"table",size:11}),(0,s.jsx)("span",{className:"dg-mono",children:N.name})]})}),(0,s.jsx)("td",{className:"dg-num",children:N.rows??"\u2014"}),(0,s.jsx)("td",{className:"dg-muted dg-truncate",title:N.comment,children:N.comment}),(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,s.jsx)(ce,{icon:"play",title:e("openInQuery"),size:11,onClick:()=>t.onQuery(N)}),(0,s.jsx)(ce,{icon:"table",title:e("data"),size:11,onClick:()=>t.onOpen(N)})]})})]},N.name))})]})})]})}function an(t){let{t:e,store:n}=t,a=ve(n.connections),o=ve(n.catalog),r=a.items.find(N=>N.id===t.connectionId),m=`${t.connectionId}|${t.database.name}|${t.schemas[0]??""}`,g=o.relations[m]??[],u=a.sessions[t.connectionId],b=r?r.engine!=="redis":!1;(0,Se.useEffect)(()=>{for(let N of t.schemas.length?t.schemas:[""])n.catalog.loadRelations(t.connectionId,t.database.name,N)},[t.connectionId,t.database.name,t.schemas,n]);let w=g.filter(N=>N.kind==="table").length,L=g.filter(N=>N.kind==="view").length,$=n.bindings().find(N=>N.connectionId===t.connectionId)??null;return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(k,{name:"database",size:12}),(0,s.jsx)("span",{className:"dg-mono",children:t.database.name}),(0,s.jsx)("span",{className:"dg-chip",children:r?.engine??""}),u?.version?(0,s.jsx)("span",{className:"dg-chip",children:u.version}):null,(0,s.jsx)("div",{className:"dg-spacer"}),b&&t.onNewQuery?(0,s.jsxs)(K,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,s.jsx)(k,{name:"play",size:10}),e("newQuery")]}):null]}),(0,s.jsxs)("div",{style:{overflow:"auto"},children:[(0,s.jsxs)("div",{className:"dg-cards",children:[(0,s.jsx)(Re,{hoverable:!0,onClick:()=>t.onOpenRelations("table"),style:{cursor:"pointer"},children:(0,s.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,s.jsx)("span",{className:"dg-stat-icon dg-stat-icon-blue",children:(0,s.jsx)(k,{name:"table",size:20})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"dg-card-value",children:w}),(0,s.jsx)("div",{className:"dg-card-label",children:e("tables")})]})]})}),(0,s.jsx)(Re,{hoverable:!0,onClick:()=>t.onOpenRelations("view"),style:{cursor:"pointer"},children:(0,s.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,s.jsx)("span",{className:"dg-stat-icon dg-stat-icon-green",children:(0,s.jsx)(k,{name:"view",size:20})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"dg-card-value",children:L}),(0,s.jsx)("div",{className:"dg-card-label",children:e("views")})]})]})}),(0,s.jsx)(Re,{hoverable:!0,children:(0,s.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,s.jsx)("span",{className:"dg-stat-icon dg-stat-icon-gold",children:(0,s.jsx)(k,{name:"folder",size:20})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"dg-card-value",children:t.schemas.length||1}),(0,s.jsx)("div",{className:"dg-card-label",children:e("schema")})]})]})}),(0,s.jsx)(Re,{hoverable:!0,children:(0,s.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,s.jsx)("span",{className:"dg-stat-icon dg-stat-icon-purple",children:(0,s.jsx)(k,{name:"archive",size:20})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"dg-card-value",children:t.database.file?Qt(t.database.file.length):"\u2014"}),(0,s.jsx)("div",{className:"dg-card-label",children:e("file")})]})]})})]}),(0,s.jsx)("div",{className:"dg-section",children:(0,s.jsx)(Re,{size:"small",title:e("agentHint"),children:(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[$&&$.connectionId===t.connectionId?(0,s.jsx)(be,{tone:"success",children:e("projectBound").replace("{name}",$.connectionName??$.connectionId).replace("{database}",$.database)}):(0,s.jsx)(be,{children:e("projectUnbound")}),(0,s.jsx)(be,{children:n.meta.allowWrites?e("writesEnabled"):e("readOnlyForAgent")})]})})}),(0,s.jsx)("div",{className:"dg-section",children:(0,s.jsx)(Re,{size:"small",title:e("schema"),children:t.schemas.length>0?(0,s.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:t.schemas.map(N=>(0,s.jsx)(Fe,{color:"blue",icon:"folder",children:(0,s.jsx)("span",{className:"dg-mono",children:N})},N))}):(0,s.jsx)("div",{className:"dg-muted",children:"default"})})})]})]})}function sn(t){let{t:e,store:n}=t,a=ve(n.catalog),o=`${t.connectionId}|${t.database}|${t.schema}`,r=a.routines[o]??[],[m,g]=(0,Se.useState)("");(0,Se.useEffect)(()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let u=r.find(b=>b.name===m)??null;return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(k,{name:"function",size:12}),(0,s.jsx)("span",{children:e("functions")}),(0,s.jsx)("span",{className:"dg-chip",children:r.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema,!0)}})]}),(0,s.jsxs)("div",{className:"dg-struct",style:{flex:1},children:[(0,s.jsx)("div",{className:"dg-struct-col",style:{flex:"0 0 46%"},children:(0,s.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:a.loading[o]?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):r.length===0?(0,s.jsx)(he,{title:e("noRoutines")}):(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:e("name")}),(0,s.jsx)("th",{children:e("type")}),(0,s.jsx)("th",{children:e("returnType")})]})}),(0,s.jsx)("tbody",{children:r.map(b=>(0,s.jsxs)("tr",{className:b.name===m?"dg-row-active":"",onClick:()=>g(b.name),children:[(0,s.jsx)("td",{className:"dg-mono",children:b.name}),(0,s.jsx)("td",{children:b.kind==="function"?e("functionKind"):e("procedureKind")}),(0,s.jsx)("td",{className:"dg-muted dg-truncate",children:b.returnType||"\u2014"})]},`${b.kind}-${b.name}`))})]})})}),(0,s.jsxs)("div",{className:"dg-struct-col",children:[(0,s.jsx)("div",{className:"dg-struct-head",children:e("definition")}),(0,s.jsx)("div",{className:"dg-struct-body",children:u?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"dg-row",style:{marginBottom:6},children:[(0,s.jsx)("span",{className:"dg-mono",children:u.name}),(0,s.jsx)("span",{className:"dg-tag",children:u.language||u.kind})]}),(0,s.jsx)("pre",{className:"dg-pre",children:u.definition||"\u2014"})]}):(0,s.jsx)("div",{className:"dg-muted",children:e("selectConnection")})})]})]})]})}function rn(t){let{t:e,store:n}=t,a=ve(n.catalog),o=a.accounts[t.connectionId]??[];return(0,Se.useEffect)(()=>{n.catalog.loadAccounts(t.connectionId)},[t.connectionId,n]),(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(k,{name:"user",size:12}),(0,s.jsx)("span",{children:e("users")}),(0,s.jsx)("span",{className:"dg-chip",children:o.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadAccounts(t.connectionId,!0)}})]}),(0,s.jsx)("div",{className:"dg-grid-wrap",children:a.loading[t.connectionId]?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):o.length===0?(0,s.jsx)(he,{title:e("noAccounts")}):(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:e("accountName")}),(0,s.jsx)("th",{children:e("accountHost")}),(0,s.jsx)("th",{children:e("accountPlugin")}),(0,s.jsx)("th",{children:e("accountPrivileged")}),(0,s.jsx)("th",{children:e("accountLocked")})]})}),(0,s.jsx)("tbody",{children:o.map(r=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"dg-mono",children:r.name}),(0,s.jsx)("td",{className:"dg-mono dg-muted",children:r.host}),(0,s.jsx)("td",{className:"dg-muted",children:r.plugin}),(0,s.jsx)("td",{children:r.privileged?"\u2713":""}),(0,s.jsx)("td",{children:r.locked?"\u2713":""})]},`${r.name}@${r.host}`))})]})})]})}function on(t){let{t:e,store:n}=t,a=ve(n.queries),o=ve(n.connections),[r,m]=(0,Se.useState)("");(0,Se.useEffect)(()=>{a.items.length===0&&n.queries.load()},[a.items.length,n]);let g=r.trim().toLowerCase(),u=(0,Se.useMemo)(()=>{let b=new Map;for(let w of a.items){if(g&&!w.name.toLowerCase().includes(g)&&!w.sql.toLowerCase().includes(g))continue;let L=o.items.find(B=>B.id===w.connectionId),$=L?.name||w.connectionId||e("connections"),N=w.database||"default",O=`${$} / ${N}`,R=b.get(O)??{key:O,connectionId:w.connectionId,connectionName:$,engine:L?.engine,database:N,items:[]};R.items.push(w),b.set(O,R)}return[...b.values()].sort((w,L)=>w.key.localeCompare(L.key))},[a.items,o.items,g,e]);return(0,s.jsxs)("div",{className:"dg-content",children:[(0,s.jsxs)("div",{className:"dg-subbar",children:[(0,s.jsx)(k,{name:"bookmark",size:12}),(0,s.jsx)("span",{children:e("queries")}),(0,s.jsx)("span",{className:"dg-chip",children:a.items.length}),(0,s.jsx)("div",{className:"dg-spacer"}),(0,s.jsx)(ie,{value:r,placeholder:e("search"),style:{width:180},onChange:b=>m(b.target.value)}),(0,s.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.queries.load()}})]}),a.error?(0,s.jsx)(be,{tone:"error",children:a.error}):null,(0,s.jsx)("div",{className:"dg-grid-wrap",children:a.loading&&a.items.length===0?(0,s.jsx)("div",{className:"dg-sqlmsg",children:(0,s.jsx)(we,{label:e("loading")})}):u.length===0?(0,s.jsx)(he,{title:e("noQueries")}):(0,s.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:14,padding:"12px 16px"},children:u.map(b=>(0,s.jsxs)("div",{className:"dg-query-category",children:[(0,s.jsxs)("div",{className:"dg-query-category-head",children:[(0,s.jsx)("span",{className:"dg-query-category-icon",children:(0,s.jsx)(k,{name:"database",size:12})}),(0,s.jsx)("span",{className:"dg-query-category-title",children:b.connectionName}),b.engine?(0,s.jsx)("span",{className:"dg-badge",children:b.engine}):null,(0,s.jsx)("span",{className:"dg-query-category-sep",children:"/"}),(0,s.jsx)("span",{className:"dg-query-category-db",children:b.database}),(0,s.jsx)("span",{className:"dg-badge",style:{marginLeft:"auto"},children:b.items.length})]}),(0,s.jsxs)("table",{className:"dg-list",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:e("queryName")}),(0,s.jsx)("th",{children:e("source")}),(0,s.jsx)("th",{children:e("updatedAt")}),(0,s.jsx)("th",{style:{width:96}})]})}),(0,s.jsx)("tbody",{children:b.items.map(w=>(0,s.jsxs)("tr",{onDoubleClick:()=>t.onOpen(w),children:[(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-list-name",children:[(0,s.jsx)(k,{name:"bookmark",size:11}),(0,s.jsx)("span",{style:{fontWeight:500},children:w.name})]})}),(0,s.jsx)("td",{children:(0,s.jsx)("span",{className:"dg-tag",children:w.scope})}),(0,s.jsx)("td",{className:"dg-muted",children:Vt(w.updatedAt)}),(0,s.jsx)("td",{children:(0,s.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,s.jsx)(ce,{icon:"play",title:e("openInEditor"),size:11,onClick:()=>t.onOpen(w)}),(0,s.jsx)(ce,{icon:"trash",title:e("delete"),size:11,onClick:()=>{n.queries.remove(w.id).catch(L=>t.notify(String(L),"error"))}})]})})]},w.id))})]})]},b.key))})})]})}var ue=require("react");var S=require("react/jsx-runtime");function ln(t){let{t:e,tab:n}=t,[a,o]=(0,ue.useState)([]),[r,m]=(0,ue.useState)(Number(n.database.replace(/[^0-9]/g,""))||0),[g,u]=(0,ue.useState)("*"),[b,w]=(0,ue.useState)(""),[L,$]=(0,ue.useState)([]),[N,O]=(0,ue.useState)("0"),[R,B]=(0,ue.useState)(""),[H,E]=(0,ue.useState)(null),[j,ee]=(0,ue.useState)(""),[Q,se]=(0,ue.useState)(null),[W,G]=(0,ue.useState)(""),[ne,P]=(0,ue.useState)(!1),[M,Y]=(0,ue.useState)(()=>new Set),[I,te]=(0,ue.useState)(null),[_,le]=(0,ue.useState)("");(0,ue.useEffect)(()=>{U.redisDatabases(n.connectionId).then(i=>o(i.databases)).catch(()=>{})},[n.connectionId]);let me=async i=>{try{let d=await U.redisScan({connectionId:n.connectionId,cursor:i?"0":N,pattern:g,type:b,database:r});$(x=>{let z=i?[]:x.slice(),X=new Set(z.map(ge=>ge.key));for(let ge of d.keys)X.has(ge.key)||z.push(ge);return z.sort((ge,xe)=>ge.key.localeCompare(xe.key))}),O(d.cursor),G("")}catch(d){G(d instanceof Error?d.message:String(d))}};(0,ue.useEffect)(()=>{$([]),B(""),E(null),me(!0)},[n.connectionId,r]);let ye=async i=>{B(i);try{E(await U.redisKey(n.connectionId,i,r)),G("")}catch(d){E(null),G(d instanceof Error?d.message:String(d))}},v=async i=>{P(!0);try{let d=await U.redisCommand(n.connectionId,i);se(d.reply),await me(!0),R&&await ye(R),G("")}catch(d){G(d instanceof Error?d.message:String(d))}finally{P(!1)}},J=(0,ue.useMemo)(()=>{let i=new Map;for(let d of L){let x=d.key.indexOf(":"),z=x>0?d.key.slice(0,x):"",X=i.get(z)??[];X.push(d),i.set(z,X)}return[...i.entries()].sort((d,x)=>d[0]===""?1:x[0]===""?-1:d[0].localeCompare(x[0]))},[L]),f=()=>H?H.value===null||H.value===void 0?(0,S.jsx)(he,{title:e("null")}):H.type==="string"?(0,S.jsx)("pre",{className:"dg-pre",style:{padding:9},children:String(H.value)}):H.type==="hash"?(0,S.jsx)("div",{className:"dg-grid-wrap",children:(0,S.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,S.jsx)("tbody",{children:Object.entries(H.value).map(([i,d])=>(0,S.jsxs)("tr",{children:[(0,S.jsx)("td",{className:"dg-mono",style:{width:"32%"},children:i}),(0,S.jsx)("td",{children:String(d)})]},i))})})}):Array.isArray(H.value)?(0,S.jsx)("div",{className:"dg-grid-wrap",children:(0,S.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,S.jsx)("tbody",{children:H.value.map((i,d)=>(0,S.jsxs)("tr",{children:[(0,S.jsx)("td",{className:"dg-rownum",children:d}),(0,S.jsx)("td",{className:"dg-mono",children:typeof i=="object"?JSON.stringify(i):String(i)})]},d))})})}):(0,S.jsx)("pre",{className:"dg-pre",style:{padding:9},children:JSON.stringify(H.value,null,2)}):(0,S.jsx)(he,{title:e("keyValue")});return(0,S.jsxs)("div",{className:"dg-redis",children:[(0,S.jsxs)("div",{className:"dg-redis-list",children:[(0,S.jsxs)("div",{className:"dg-panehead",children:[(0,S.jsx)(k,{name:"database",size:11}),e("redisKeys"),(0,S.jsx)("div",{className:"dg-spacer"}),(0,S.jsx)(ke,{value:String(r),onChange:i=>m(Number(i.target.value)),children:(a.length?a:[{name:"db0",schemas:[]}]).map(i=>(0,S.jsx)("option",{value:i.name.replace("db",""),children:i.name},i.name))}),(0,S.jsx)(ce,{icon:"plus",title:e("newKey"),size:11,onClick:()=>{te({kind:"new"}),le("")}}),(0,S.jsx)(ce,{icon:"refresh",title:e("refresh"),size:11,onClick:()=>{me(!0)}})]}),(0,S.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,S.jsxs)("div",{className:"dg-search",children:[(0,S.jsx)(k,{name:"search",size:10}),(0,S.jsx)("input",{value:g,placeholder:e("redisPattern"),onChange:i=>u(i.target.value),onKeyDown:i=>i.key==="Enter"&&void me(!0)})]}),(0,S.jsxs)(ke,{value:b,onChange:i=>{w(i.target.value),me(!0)},children:[(0,S.jsx)("option",{value:"",children:"any"}),["string","hash","list","set","zset","stream"].map(i=>(0,S.jsx)("option",{value:i,children:i},i))]})]}),(0,S.jsx)("div",{className:"dg-redis-keys",children:L.length===0?(0,S.jsx)("div",{className:"dg-muted",style:{padding:7},children:e("emptyObjects")}):J.map(([i,d])=>{let x=i===""||!M.has(i);return(0,S.jsxs)("div",{children:[i?(0,S.jsxs)("div",{className:"dg-rns",onClick:()=>Y(z=>{let X=new Set(z);return X.has(i)?X.delete(i):X.add(i),X}),children:[(0,S.jsx)("span",{className:`dg-twist${x?" dg-twist-open":""}`,children:(0,S.jsx)(k,{name:"chevron",size:8})}),(0,S.jsx)(k,{name:"folder",size:10}),(0,S.jsxs)("span",{className:"dg-truncate",style:{flex:1},children:[i,":"]}),(0,S.jsx)("span",{className:"dg-badge",children:d.length})]}):null,x?d.map(z=>(0,S.jsxs)("div",{className:`dg-rkey${z.key===R?" dg-rkey-active":""}`,onClick:()=>{ye(z.key)},title:z.key,children:[(0,S.jsx)("span",{className:"dg-truncate",style:{flex:1},children:i?z.key.slice(i.length+1):z.key}),(0,S.jsx)("span",{className:"dg-badge",children:z.type})]},z.key)):null]},i||"_")})}),N!=="0"?(0,S.jsx)("div",{className:"dg-pager",children:(0,S.jsx)(K,{size:"sm",onClick:()=>{me(!1)},children:e("scanMore")})}):null]}),(0,S.jsxs)("div",{className:"dg-redis-detail",children:[W?(0,S.jsx)(be,{tone:"error",onClose:()=>G(""),children:W}):null,H?(0,S.jsxs)("div",{className:"dg-subbar",children:[(0,S.jsx)("span",{className:"dg-mono dg-truncate",title:H.key,children:H.key}),(0,S.jsx)("span",{className:"dg-tag",children:H.type}),(0,S.jsxs)("span",{className:"dg-chip",children:[e("ttl"),": ",H.ttl>0?`${H.ttl}s`:e("noTtl")]}),(0,S.jsx)("div",{className:"dg-spacer"}),(0,S.jsx)(K,{size:"sm",onClick:()=>{te({kind:"rename"}),le(H.key)},children:e("rename")}),(0,S.jsx)(K,{size:"sm",onClick:()=>{te({kind:"ttl"}),le(H.ttl>0?String(H.ttl):"3600")},children:e("setTtl")}),(0,S.jsx)(K,{size:"sm",onClick:()=>{te({kind:"value"}),le(String(H.value??""))},children:e("editValue")}),(0,S.jsx)(K,{size:"sm",variant:"danger",onClick:()=>{(async()=>{await U.redisDelete(n.connectionId,H.key,H.database??r),B(""),E(null),await me(!0),t.notify(e("deleted"),"success")})()},children:e("deleteKey")})]}):null,(0,S.jsx)("div",{className:"dg-grid-wrap",children:f()}),(0,S.jsxs)("div",{className:"dg-redis-console",children:[(0,S.jsxs)("div",{className:"dg-row",children:[(0,S.jsx)(k,{name:"play",size:10}),(0,S.jsx)(ie,{value:j,placeholder:e("commandHint"),style:{flex:1},onChange:i=>ee(i.target.value),onKeyDown:i=>i.key==="Enter"&&j.trim()&&void v(j)}),(0,S.jsx)(K,{size:"sm",variant:"primary",disabled:ne,onClick:()=>j.trim()&&void v(j),children:e("run")})]}),Q!==null?(0,S.jsx)("pre",{className:"dg-pre",style:{maxHeight:110,overflow:"auto"},children:JSON.stringify(Q,null,2)}):null]})]}),I?(0,S.jsx)(Te,{title:I.kind==="new"?e("newKey"):I.kind==="rename"?e("rename"):I.kind==="ttl"?e("setTtl"):e("editValue"),width:420,onClose:()=>te(null),footer:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(K,{onClick:()=>te(null),children:e("cancel")}),(0,S.jsx)(K,{variant:"primary",onClick:()=>{(async()=>{let i=x=>x.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),d="";I.kind==="new"&&(d=`SET "${i(_)}" ""`),I.kind==="rename"&&H&&(d=`RENAME "${i(H.key)}" "${i(_)}"`),I.kind==="ttl"&&H&&(d=`EXPIRE "${i(H.key)}" ${Number.parseInt(_,10)||0}`),I.kind==="value"&&H&&(d=`SET "${i(H.key)}" "${i(_)}"`),d&&await v(d),te(null),t.notify(e("saved"),"success")})()},children:e("save")})]}),children:(0,S.jsx)(oe,{label:I.kind==="ttl"?e("ttl"):I.kind==="value"?e("keyValue"):e("name"),children:(0,S.jsx)(ie,{value:_,autoFocus:!0,onChange:i=>le(i.target.value)})})}):null]})}var pe=require("react");var D=require("react/jsx-runtime");function dn(t){let{t:e,tab:n}=t,[a,o]=(0,pe.useState)(n.initialSql??""),[r,m]=(0,pe.useState)(null),[g,u]=(0,pe.useState)(0),[b,w]=(0,pe.useState)(!1),[L,$]=(0,pe.useState)(""),[N,O]=(0,pe.useState)(""),[R,B]=(0,pe.useState)(null),[H,E]=(0,pe.useState)(0),[j,ee]=(0,pe.useState)(!1),[Q,se]=(0,pe.useState)(""),W=(0,pe.useRef)(null),G=(0,pe.useRef)(null),ne=(0,pe.useMemo)(()=>a.split(`
`).length,[a]),P=(0,pe.useMemo)(()=>bt(a),[a]),M=(0,pe.useMemo)(()=>{let f=[];for(let i of t.tables)f.push({label:i,kind:"table"});for(let i of ft)f.push({label:i,kind:"fn"});for(let i of mt)f.push({label:i,kind:"kw"});return f},[t.tables]);(0,pe.useEffect)(()=>{n.initialSql&&o(n.initialSql)},[n.id,n.initialSql]);let Y=f=>{let i=W.current;if(!i)return;let d=i.selectionStart,x=/([A-Za-z_][A-Za-z0-9_]*)$/.exec(a.slice(0,d))?.[1]??"";if(!x&&!f)return B(null);let z=x.toLowerCase(),X=new Set,ge=M.filter($e=>{let ze=$e.label.toLowerCase();return z&&!ze.startsWith(z)||X.has(ze)?!1:(X.add(ze),!0)}).slice(0,14);if(ge.length===0)return B(null);let xe=Bt(i,d-x.length);B({items:ge,index:0,left:xe.left,top:xe.top+18,start:d-x.length,end:d})},I=()=>{if(!R)return;let f=R.items[R.index];if(!f)return;let i=R.start+f.label.length;o(`${a.slice(0,R.start)}${f.label}${a.slice(R.end)}`),B(null),requestAnimationFrame(()=>{let d=W.current;d&&(d.focus(),d.selectionStart=d.selectionEnd=i)})},te=async f=>{let i=f.trim();if(!i)return t.notify(e("noStatements"),"info");w(!0),$("");try{let d=await U.sql({connectionId:n.connectionId,database:n.database,sql:i});m(d),u(0);let x=d.results.find(X=>X.error),z=d.results[0];O(x?fe(e("queryFailed"),{ms:d.durationMs}):fe(e("queryOk"),{n:z?.rowCount??0,ms:d.durationMs})),d.results.some(X=>X.truncated)&&$(e("resultTruncated")),x?.error&&$(x.error)}catch(d){$(d instanceof Error?d.message:String(d)),m(null),O("")}finally{w(!1)}},_=async()=>{try{let f=await U.sqlCancel(n.connectionId);t.notify(f.cancelled?e("queryCancelled"):f.reason||e("cancelUnsupported"),f.cancelled?"info":"error")}catch(f){t.notify(f instanceof Error?f.message:String(f),"error")}},le=()=>{let f=W.current;f&&f.selectionStart!==f.selectionEnd?te(a.slice(f.selectionStart,f.selectionEnd)):te(a)},me=()=>{let f=a.split(";").map(i=>i.trim()).filter(Boolean)[0];if(!f)return t.notify(e("noStatements"),"info");te(/^explain\b/i.test(f)?f:`EXPLAIN ${f}`)},ye=f=>{if(R){if(f.key==="ArrowDown")return f.preventDefault(),B({...R,index:(R.index+1)%R.items.length});if(f.key==="ArrowUp")return f.preventDefault(),B({...R,index:(R.index-1+R.items.length)%R.items.length});if(f.key==="Enter"||f.key==="Tab")return f.preventDefault(),I();if(f.key==="Escape")return f.preventDefault(),B(null)}if((f.ctrlKey||f.metaKey)&&f.key==="Enter")return f.preventDefault(),le();if(f.ctrlKey&&f.key===" ")return f.preventDefault(),Y(!0);if(f.key==="Tab"){f.preventDefault();let i=f.currentTarget,d=i.selectionStart,x=i.selectionEnd;o(`${a.slice(0,d)}  ${a.slice(x)}`),requestAnimationFrame(()=>{i.selectionStart=i.selectionEnd=d+2})}},v=r?.results[g]??null,J=()=>r?v?v.error?(0,D.jsxs)("div",{style:{padding:9},children:[(0,D.jsx)("div",{className:"dg-err",children:v.error}),(0,D.jsx)("pre",{className:"dg-pre",style:{marginTop:7,opacity:.7},children:v.statement})]}):v.columns.length===0?(0,D.jsxs)("div",{className:"dg-sqlmsg",children:[fe(e("affected"),{n:v.affected??0})," \xB7 ",v.durationMs," ms"]}):(0,D.jsx)("div",{className:"dg-grid-wrap",children:(0,D.jsxs)("table",{className:"dg-grid",style:{width:"100%"},children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("th",{className:"dg-rownum",children:"#"}),v.columns.map(f=>(0,D.jsx)("th",{children:f.name},f.name))]})}),(0,D.jsx)("tbody",{children:v.rows.map((f,i)=>(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"dg-rownum",children:i+1}),v.columns.map(d=>{let x=_e(f[d.name],e("null"));return(0,D.jsx)("td",{className:x.isNull?"dg-null":"",title:x.text,children:x.text},d.name)})]},i))})]})}):(0,D.jsx)(he,{title:e("emptyResult")}):(0,D.jsx)(he,{title:e("runHint"),hint:e("completionHint")});return(0,D.jsxs)("div",{className:"dg-sql",children:[(0,D.jsxs)("div",{className:"dg-sql-top",children:[(0,D.jsxs)("div",{className:"dg-editor",children:[(0,D.jsx)("div",{className:"dg-gutter","aria-hidden":!0,children:(0,D.jsx)("div",{style:{transform:`translateY(${-H}px)`},children:Array.from({length:ne},(f,i)=>i+1).join(`
`)})}),(0,D.jsxs)("div",{className:"dg-code",children:[(0,D.jsxs)("pre",{className:"dg-hl",ref:G,"aria-hidden":!0,children:[P.map((f,i)=>f.type==="ws"?f.value:(0,D.jsx)("span",{className:`dg-tok dg-tok-${f.type==="plain"?"ident":f.type}`,children:f.value},i)),(0,D.jsx)("span",{children:"\u200B"})]}),(0,D.jsx)("textarea",{ref:W,className:"dg-sql-text",value:a,spellCheck:!1,placeholder:"SELECT * FROM ...",onChange:f=>{o(f.target.value),requestAnimationFrame(()=>Y(!1))},onScroll:f=>{if(E(f.currentTarget.scrollTop),G.current){let i=f.currentTarget;G.current.scrollTop=i.scrollTop,G.current.scrollLeft=i.scrollLeft}},onKeyDown:ye,onBlur:()=>setTimeout(()=>B(null),120)}),R?(0,D.jsx)("div",{className:"dg-complete",style:{left:R.left,top:R.top},children:R.items.map((f,i)=>(0,D.jsxs)("div",{className:`dg-complete-item${i===R.index?" dg-complete-item-on":""}`,onMouseDown:d=>{d.preventDefault(),B({...R,index:i}),requestAnimationFrame(I)},children:[(0,D.jsx)("span",{children:f.label}),(0,D.jsx)("span",{className:"dg-complete-kind",children:f.kind})]},`${f.kind}-${f.label}`))}):null]})]}),(0,D.jsxs)("div",{className:"dg-sqlbar",children:[(0,D.jsxs)(K,{size:"sm",variant:"primary",disabled:b,onClick:le,children:[b?(0,D.jsx)(we,{}):(0,D.jsx)(k,{name:"play",size:10}),e("run")]}),b?(0,D.jsx)(K,{size:"sm",variant:"danger",onClick:()=>{_()},children:e("cancelQuery")}):null,(0,D.jsx)(K,{size:"sm",disabled:b,onClick:me,children:e("explain")}),(0,D.jsxs)(K,{size:"sm",onClick:()=>o(Lt(a)),children:[(0,D.jsx)(k,{name:"wand",size:10}),e("beautify")]}),(0,D.jsxs)(K,{size:"sm",onClick:()=>{se(Q||`Query ${new Date().toISOString().slice(0,16).replace("T"," ")}`),ee(!0)},children:[(0,D.jsx)(k,{name:"bookmark",size:10}),e("saveQuery")]}),(0,D.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{o(""),m(null),$(""),O("")},children:e("clear")}),(0,D.jsx)("span",{className:"dg-muted dg-hint",children:e("runHint")}),(0,D.jsx)("div",{className:"dg-spacer"}),N?(0,D.jsx)("span",{className:"dg-chip",children:N}):null]})]}),r&&r.results.length>1?(0,D.jsx)("div",{className:"dg-rtabs",children:r.results.map((f,i)=>(0,D.jsxs)("button",{type:"button",className:`dg-rtab${i===g?" dg-rtab-active":""}`,onClick:()=>u(i),children:[f.error?(0,D.jsx)(k,{name:"alert",size:10}):null,fe(e("result"),{n:i+1})," \xB7 ",f.rowCount]},i))}):null,L&&!v?.error?(0,D.jsx)(be,{tone:"error",onClose:()=>$(""),children:L}):null,(0,D.jsx)("div",{className:"dg-results",children:J()}),j?(0,D.jsxs)(Te,{title:e("saveQuery"),width:420,onClose:()=>ee(!1),footer:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(K,{onClick:()=>ee(!1),children:e("cancel")}),(0,D.jsx)(K,{variant:"primary",onClick:()=>{(async()=>{try{await U.saveQuery({name:Q.trim()||"Query",sql:a,connectionId:n.connectionId,database:n.database,scope:"user"}),ee(!1),t.notify(e("querySaved"),"success"),t.onSaved()}catch(f){t.notify(f instanceof Error?f.message:String(f),"error")}})()},children:e("save")})]}),children:[(0,D.jsx)(oe,{label:e("queryName"),children:(0,D.jsx)(ie,{value:Q,autoFocus:!0,onChange:f=>se(f.target.value)})}),(0,D.jsx)("pre",{className:"dg-pre",style:{maxHeight:160,overflow:"auto"},children:a})]}):null]})}var V=require("react");var c=require("react/jsx-runtime"),On=[50,100,200,500];function Kn(t){let e=String(t??"").toLowerCase();if(/\b(json|jsonb|xml|text|clob|ntext|longtext|mediumtext|bytea)\b/.test(e))return!0;let n=/(?:var)?char(?:acter varying)?\s*\(\s*(\d+)\s*\)/.exec(e);return n?Number(n[1])>120:!1}function cn(t){let{t:e,tab:n,engine:a}=t,[o,r]=(0,V.useState)("data"),m={connectionId:n.connectionId,database:n.database,schema:n.schema,table:n.table},g=`${m.connectionId}|${m.database}|${m.schema}|${m.table}`,[u,b]=(0,V.useState)(null),[w,L]=(0,V.useState)(""),[$,N]=(0,V.useState)(0);return(0,V.useEffect)(()=>{let O=!1;return U.describe(m.connectionId,m.database,m.schema,m.table).then(R=>{O||(b(R),L(""))}).catch(R=>{O||L(R instanceof Error?R.message:String(R))}),()=>{O=!0}},[g,$]),(0,c.jsxs)("div",{className:"dg-content",children:[(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsx)(k,{name:n.tableKind==="view"?"view":"table",size:12}),(0,c.jsx)("span",{className:"dg-mono",children:n.table}),(0,c.jsx)("span",{className:"dg-chip",children:n.database||"main"}),n.schema?(0,c.jsx)("span",{className:"dg-chip",children:n.schema}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(Yt,{value:o,onChange:r,options:[{value:"data",label:e("data")},{value:"structure",label:e("structure")}]})]}),o==="data"?(0,c.jsx)(Fn,{t:e,scope:m,engine:a,notify:t.notify,meta:u,onRefreshMeta:()=>N(O=>O+1),onNewQuery:t.onNewQuery}):(0,c.jsx)(jn,{t:e,meta:u,error:w,onRefresh:()=>N(O=>O+1)})]})}function Fn({t,scope:e,engine:n,notify:a,meta:o,onRefreshMeta:r,onNewQuery:m}){let[g,u]=(0,V.useState)(1),[b,w]=(0,V.useState)(100),[L,$]=(0,V.useState)({column:"",dir:""}),[N,O]=(0,V.useState)(""),[R,B]=(0,V.useState)(!1),[H,E]=(0,V.useState)([]),[j,ee]=(0,V.useState)("AND"),[Q,se]=(0,V.useState)(null),[W,G]=(0,V.useState)(!1),[ne,P]=(0,V.useState)(""),[M,Y]=(0,V.useState)(null),[I,te]=(0,V.useState)(null),_=(0,V.useRef)(null),[le,me]=(0,V.useState)(0),[ye,v]=(0,V.useState)(null),[J,f]=(0,V.useState)(!1),[i,d]=(0,V.useState)([]),[x,z]=(0,V.useState)(null),X=(0,V.useRef)(null),[ge,xe]=(0,V.useState)(!1),[$e,ze]=(0,V.useState)(null),Et=(0,V.useRef)(null),it=(0,V.useRef)(!1),It=(0,V.useRef)(null),Rt=l=>{_.current=l,te(l)},Be=l=>{X.current=l,z(l)},st=`${e.connectionId}|${e.database}|${e.schema}|${e.table}`,[Qe,Ue]=(0,V.useState)("");(0,V.useEffect)(()=>{if(Qe===N)return;let l=setTimeout(()=>{O(Qe),u(1)},320);return()=>clearTimeout(l)},[Qe,N]);let rt=(0,V.useRef)(""),ot=(0,V.useRef)(!1),lt=`${st}|${N}|${L.column}|${L.dir}`;(0,V.useEffect)(()=>{let l=new AbortController,y=!1;G(!0),P("");let h=ot.current?"exact":rt.current===lt?"none":"auto";return U.rows({...e,page:g,pageSize:b,orderBy:L.column,orderDir:L.dir,where:N,total:h},l.signal).then(C=>{y||(rt.current=lt,ot.current=!1,_.current=null,te(null),X.current=null,z(null),Y(null),se(F=>({...C,total:typeof C.total=="number"?C.total:F?.total??C.rows.length,totalKind:C.totalKind==="none"&&F?F.totalKind:C.totalKind})))}).catch(C=>{y||C instanceof DOMException&&C.name==="AbortError"||(P(C instanceof Error?C.message:String(C)),se(null))}).finally(()=>{y||G(!1)}),()=>{y=!0,l.abort()}},[st,g,b,L.column,L.dir,N,le,lt]);let Ee=o?.columns??[],Ve=(0,V.useMemo)(()=>Ee.filter(l=>l.primaryKey).map(l=>l.name),[Ee]),zt=(0,V.useCallback)(l=>{let y={};for(let h of Ve)y[h]=l[h];return y},[Ve]),Ie=Q?.rows??[],Mt=Q?.total??0,dt=Math.max(1,Math.ceil(Mt/b)),qe=Ve.length===0,We=(Q?.columns??[]).filter(l=>!i.includes(l.name)),fn=Ee.length>0?Ee.map(l=>({name:l.name,type:l.type,primaryKey:!!l.primaryKey,nullable:l.nullable})):(Q?.columns??[]).map(l=>({name:l.name,type:l.type??"",primaryKey:!1,nullable:!0})),Oe=(0,V.useCallback)(()=>{rt.current="",ot.current=!0,me(l=>l+1),r()},[r]);(0,V.useEffect)(()=>{Y(null),te(null)},[st,g,b,N,le]);let Ae=(0,V.useMemo)(()=>{if(!M||!Q)return null;let l=[],y=0;for(let C=M.top;C<=M.bottom;C+=1){let F=Ie[C];if(F)for(let ae=M.left;ae<=M.right;ae+=1){let re=We[ae];if(!re)continue;y+=1;let de=Number(F[re.name]);!Number.isNaN(de)&&F[re.name]!==null&&l.push(de)}}if(l.length===0)return{cells:y,count:0,sum:0,avg:0};let h=l.reduce((C,F)=>C+F,0);return{cells:y,count:l.length,sum:h,avg:h/l.length}},[M,Q,Ie]),bn=l=>{$(y=>y.column!==l?{column:l,dir:"asc"}:y.dir==="asc"?{column:l,dir:"desc"}:{column:"",dir:""}),u(1)},vn=async()=>{if(!M||!Q)return;let l=[];for(let y=M.top;y<=M.bottom;y+=1){let h=Ie[y];h&&l.push(We.slice(M.left,M.right+1).map(C=>Ge(h[C.name])).join("	"))}try{await navigator.clipboard.writeText(l.join(`
`)),a(t("copied"),"success")}catch{a(t("error"),"error")}},Pt=async()=>{let l=_.current;if(_.current=null,te(null),!l)return;let y=l.original===null||l.original===void 0?"":String(l.original);if(l.value!==y){if(qe)return a(t("noPrimaryKey"),"error");try{await U.updateRow({...e,key:l.key,changes:{[l.columnName]:l.value===""&&l.original===null?null:l.value}}),a(t("cellSaved"),"success"),Oe()}catch(h){a(h instanceof Error?h.message:String(h),"error")}}},hn=async l=>{let y=Ie[l];if(!y||qe||!window.confirm(t("confirmDelete")))return;let h={};for(let C of Ve)h[C]=y[C];try{await U.deleteRow({...e,key:h}),a(t("deleted"),"success"),Oe()}catch(C){a(C instanceof Error?C.message:String(C),"error")}},Xe=async l=>{try{let y=await U.exportRows({...e,where:N,orderBy:L.column,orderDir:L.dir}),h=Ot(e.table);if(l==="csv"){let C=y.columns.map(ae=>ae.name),F=[C.map(Ge).join(",")].concat(y.rows.map(ae=>C.map(re=>Ge(ae[re])).join(","))).join(`\r
`);Je(`${h}.csv`,"text/csv",F)}else l==="json"?Je(`${h}.json`,"application/json",JSON.stringify(y.rows,null,2)):l==="insert"?Je(`${h}.sql`,"application/sql",Kt(n,e,y.columns,y.rows)):Je(`${h}.md`,"text/markdown",Ft(y.columns,y.rows));y.truncated&&a(fe(t("exportTruncated"),{n:y.rows.length}),"info")}catch(y){a(y instanceof Error?y.message:String(y),"error")}},Dt=200,yn=async l=>{let y=await l.text(),h=jt(y);if(h.errors.length>0){a(fe(t("importFailed"),{n:0,error:h.errors.slice(0,3).join("; ")}),"error");return}if(h.header.length===0||h.rows.length===0){a(t("importEmpty"),"error");return}let C=new Set((Ee.length?Ee:Q?.columns??[]).map(de=>de.name));if(C.size===0){a(t("importNoColumns"),"error");return}let F=h.header.filter(de=>!C.has(de));if(F.length>0){a(fe(t("importUnknownColumns"),{cols:F.join(", ")}),"error");return}let ae=h.rows.map(de=>{let Me={};return h.header.forEach((gt,Cn)=>{let $t=de[Cn]??"";Me[gt]=$t===""?null:$t}),Me});f(!0);let re=0;try{for(let de=0;de<ae.length;de+=Dt){let Me=ae.slice(de,de+Dt),gt=await U.insertRows({...e,rows:Me});re+=gt.inserted}a(fe(t("importDone"),{n:re}),"success"),Oe()}catch(de){let Me=de instanceof Error?de.message:String(de);a(fe(t("importFailed"),{n:re,error:Me}),"error")}finally{f(!1)}},xn=async()=>{try{let l=await U.insertRow({...e,values:{}});a(l.affected>0?t("rowInserted"):t("insertRowFailed"),l.affected>0?"success":"error"),Oe()}catch(l){a(l instanceof Error?l.message:String(l),"error")}},wn=l=>{let y=Ie[l];if(!y||qe)return;if(W)return a(t("loading"),"info");let h=(Q?.columns??[]).map(ae=>ae.name),C={},F={};for(let ae of h){let re=y[ae];F[ae]=re,C[ae]=re==null?"":String(re)}Be({key:zt(y),original:F,draft:C,fields:h})},kn=async()=>{let l=X.current;if(!l)return;let y={};for(let h of l.fields){let C=l.original[h],F=C==null?"":String(C),ae=l.draft[h]??"";if(ae===F)continue;let re=Ee.find(de=>de.name===h);y[h]=ae===""&&(re?.nullable??!0)?null:ae}if(Object.keys(y).length===0){Be(null);return}xe(!0);try{await U.updateRow({...e,key:l.key,changes:y}),a(t("rowSaved"),"success"),Be(null),Oe()}catch(h){a(h instanceof Error?h.message:String(h),"error")}finally{xe(!1)}},ct=(l,y,h)=>{Y(C=>h&&C?{top:Math.min(C.top,l),left:Math.min(C.left,y),bottom:Math.max(C.bottom,l),right:Math.max(C.right,y)}:{top:l,left:y,bottom:l,right:y})},Sn=l=>{if((l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="c"){l.preventDefault(),vn();return}if(!M)return;let h={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[l.key];if(!h)return;l.preventDefault();let C=Math.max(0,Math.min(Ie.length-1,M.top+h[0])),F=Math.max(0,Math.min(We.length-1,M.left+h[1]));ct(C,F,l.shiftKey)},Nn=We.map((l,y)=>(0,c.jsxs)("th",{className:L.column===l.name?"dg-th-sorted":"",onClick:()=>bn(l.name),title:l.name,children:[l.name,L.column===l.name?(0,c.jsx)("span",{className:"dg-sortmark",children:L.dir==="desc"?"\u25BC":"\u25B2"}):null,Ve.includes(l.name)?(0,c.jsx)("span",{className:"dg-colkey",title:t("primaryKey"),children:(0,c.jsx)(k,{name:"key",size:10})}):null,(0,c.jsx)("span",{className:"dg-colresize",onMouseDown:h=>{h.stopPropagation();let C=h.clientX,F=h.target.parentElement,ae=F?.offsetWidth??160,re=Me=>{F&&(F.style.width=`${Math.max(60,ae+Me.clientX-C)}px`)},de=()=>{window.removeEventListener("mousemove",re),window.removeEventListener("mouseup",de)};window.addEventListener("mousemove",re),window.addEventListener("mouseup",de)},onClick:h=>h.stopPropagation()})]},l.name));return(0,c.jsxs)("div",{className:"dg-content",children:[qe?(0,c.jsx)(be,{tone:"info",children:t("noPrimaryKey")}):null,ne?(0,c.jsx)(be,{tone:"error",onClose:()=>P(""),children:ne}):null,(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsxs)(K,{size:"sm",active:!!N,onClick:()=>{let l=vt(n,{joiner:j,conditions:H});Ue(l),O(l),u(1)},children:[(0,c.jsx)(k,{name:"filter",size:11}),t("filter")]}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>B(l=>!l),children:t("filterBuilder")}),(0,c.jsx)(ie,{value:Qe,placeholder:t("rawWhere"),style:{flex:1,minWidth:120,maxWidth:380},onChange:l=>Ue(l.target.value),onKeyDown:l=>{l.key==="Enter"&&(O(Qe),u(1))}}),N?(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{Ue(""),O(""),E([]),u(1)},children:t("clear")}):null,m&&n!=="redis"?(0,c.jsxs)(K,{size:"sm",variant:"tonal",onClick:m,title:t("newQuery"),children:[(0,c.jsx)(k,{name:"play",size:10}),t("newQuery")]}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsxs)("span",{className:"dg-chip",title:Q?.totalKind==="estimate"?t("estimatedTotal"):void 0,children:[Q?.totalKind==="estimate"?"\u2248 ":"",(0,c.jsx)("b",{children:Mt})," ",t("rows")]}),(0,c.jsx)(ce,{icon:"refresh",title:t("refresh"),onClick:Oe}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{xn()},children:t("insertRow")}),(0,c.jsx)("input",{ref:Et,type:"file",accept:".csv,text/csv",style:{display:"none"},onChange:l=>{let y=l.target.files?.[0];y&&yn(y),l.target.value=""}}),(0,c.jsxs)(K,{size:"sm",variant:"ghost",disabled:J,onClick:()=>Et.current?.click(),children:[J?(0,c.jsx)(we,{}):null,t("importCsv")]}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:l=>{let y=l.currentTarget.getBoundingClientRect();ze({x:y.left,y:y.bottom+2})},children:t("columnChooser")}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:l=>{let y=l.currentTarget.getBoundingClientRect();v({x:y.left,y:y.bottom+2})},children:t("exportAs")})]}),R?(0,c.jsxs)("div",{className:"dg-subbar",style:{gap:6,flexWrap:"wrap"},children:[(0,c.jsxs)(ke,{value:j,onChange:l=>ee(l.target.value),children:[(0,c.jsx)("option",{value:"AND",children:t("matchAll")}),(0,c.jsx)("option",{value:"OR",children:t("matchAny")})]}),H.map((l,y)=>(0,c.jsxs)("span",{className:"dg-row",style:{gap:3},children:[(0,c.jsx)(ke,{value:l.column,onChange:h=>E(C=>C.map((F,ae)=>ae===y?{...F,column:h.target.value}:F)),children:Ee.map(h=>(0,c.jsx)("option",{value:h.name,children:h.name},h.name))}),(0,c.jsx)(ke,{value:l.op,onChange:h=>E(C=>C.map((F,ae)=>ae===y?{...F,op:h.target.value}:F)),children:Ht.map(h=>(0,c.jsx)("option",{value:h,children:h},h))}),(0,c.jsx)(ie,{value:l.value,style:{width:120},onChange:h=>E(C=>C.map((F,ae)=>ae===y?{...F,value:h.target.value}:F))}),(0,c.jsx)(ce,{icon:"x",title:t("delete"),size:10,onClick:()=>E(h=>h.filter((C,F)=>F!==y))})]},y)),(0,c.jsxs)(K,{size:"sm",onClick:()=>E(l=>l.concat({column:Ee[0]?.name??"",op:"=",value:""})),children:[(0,c.jsx)(k,{name:"plus",size:10}),t("addCondition")]}),(0,c.jsx)(K,{size:"sm",variant:"primary",onClick:()=>{let l=vt(n,{joiner:j,conditions:H});Ue(l),O(l),u(1)},children:t("apply")})]}):null,(0,c.jsxs)("div",{className:"dg-grid-wrap",children:[W&&!Q?(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(we,{label:t("loading")})}):null,Q&&Ie.length===0?(0,c.jsx)(he,{title:t("emptyTable")}):null,Q&&Ie.length>0?(0,c.jsxs)("table",{className:"dg-grid",ref:It,tabIndex:0,onKeyDown:Sn,children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"dg-rownum",children:"#"}),Nn,(0,c.jsx)("th",{style:{width:26}})]})}),(0,c.jsx)("tbody",{children:Ie.map((l,y)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:`dg-rownum${qe?"":" dg-rownum-editable"}`,title:qe?void 0:t("editRow"),onClick:()=>wn(y),children:(g-1)*b+y+1}),We.map((h,C)=>{let F=_e(l[h.name],t("null")),ae=M&&y>=M.top&&y<=M.bottom&&C>=M.left&&C<=M.right;return I&&I.rowIndex===y&&I.columnName===h.name?(0,c.jsx)("td",{className:"dg-cell-editing",children:(0,c.jsx)("input",{autoFocus:!0,value:I.value,onChange:re=>Rt({...I,value:re.target.value}),onBlur:()=>{Pt()},onKeyDown:re=>{re.key==="Enter"&&(re.preventDefault(),Pt()),re.key==="Escape"&&(_.current=null,te(null))}})},h.name):(0,c.jsx)("td",{className:`${ae?"dg-cell-selected":""}${F.isNull?" dg-null":""}${/int|numeric|decimal|real|double|float|money/i.test(h.type??"")?" dg-cell-num":""}`,title:F.isNull?t("null"):F.text,onMouseDown:re=>{it.current=!0,It.current?.focus(),ct(y,C,re.shiftKey);let de=()=>{it.current=!1,window.removeEventListener("mouseup",de)};window.addEventListener("mouseup",de)},onMouseEnter:()=>{it.current&&ct(y,C,!1)},onDoubleClick:()=>{if(qe)return a(t("noPrimaryKey"),"error");if(W)return a(t("loading"),"info");Rt({rowIndex:y,columnName:h.name,key:zt(l),original:l[h.name],value:F.isNull?"":String(l[h.name])})},children:F.text},h.name)}),(0,c.jsx)("td",{children:(0,c.jsx)(ce,{icon:"trash",title:t("deleteRow"),size:11,onClick:()=>{hn(y)}})})]},y))})]}):null]}),(0,c.jsxs)("div",{className:"dg-pager",children:[(0,c.jsx)(ce,{icon:"chevronLeft",title:t("prev"),size:11,disabled:g<=1,onClick:()=>u(l=>Math.max(1,l-1))}),(0,c.jsx)("span",{children:fe(t("page"),{page:g,pages:dt})}),(0,c.jsx)(ce,{icon:"chevron",title:t("next"),size:11,disabled:g>=dt,onClick:()=>u(l=>Math.min(dt,l+1))}),(0,c.jsx)("div",{className:"dg-spacer"}),Ae&&Ae.cells>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"dg-chip",children:fe(t("selection"),{n:Ae.cells})}),Ae.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("sum")," ",(0,c.jsx)("b",{children:Ae.sum.toFixed(2)})]}):null,Ae.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("avg")," ",(0,c.jsx)("b",{children:Ae.avg.toFixed(2)})]}):null]}):null,(0,c.jsx)("span",{children:t("pageSize")}),(0,c.jsx)(ke,{value:String(b),onChange:l=>{w(Number(l.target.value)),u(1)},children:On.map(l=>(0,c.jsx)("option",{value:String(l),children:l},l))})]}),$e?(0,c.jsx)(je,{x:$e.x,y:$e.y,onClose:()=>ze(null),items:[...(Q?.columns??[]).map(l=>{let y=!i.includes(l.name);return{label:l.name,icon:y?"check":void 0,onClick:()=>d(h=>h.includes(l.name)?h.filter(C=>C!==l.name):h.concat(l.name))}}),...i.length>0?[{separator:!0},{label:t("showAll"),icon:"columns",onClick:()=>d([])}]:[]]}):null,ye?(0,c.jsx)(je,{x:ye.x,y:ye.y,onClose:()=>v(null),items:[{label:t("exportCsv"),onClick:()=>{Xe("csv")}},{label:t("exportJson"),onClick:()=>{Xe("json")}},{label:t("exportInsert"),onClick:()=>{Xe("insert")}},{label:t("exportMarkdown"),onClick:()=>{Xe("markdown")}}]}):null,x?(0,c.jsx)(Te,{title:`${t("editRow")} \xB7 ${Object.values(x.key).map(l=>String(l)).join(", ")}`,width:560,busy:ge,onClose:()=>Be(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(K,{onClick:()=>Be(null),children:t("cancel")}),(0,c.jsx)(K,{variant:"primary",disabled:ge,onClick:()=>{kn()},children:t("save")})]}),children:(0,c.jsx)("div",{className:"dg-form",children:fn.map(l=>{let y=x.draft[l.name]??"",h=C=>{let F=X.current;F&&Be({...F,draft:{...F.draft,[l.name]:C}})};return(0,c.jsx)(oe,{label:`${l.name}${l.primaryKey?" \xB7 PK":""}`,children:Kn(l.type)?(0,c.jsx)(et,{rows:3,value:y,onChange:C=>h(C.target.value)}):(0,c.jsx)(ie,{value:y,placeholder:l.nullable?t("null"):"",onChange:C=>h(C.target.value)})},l.name)})})}):null]})}function jn({t,meta:e,error:n,onRefresh:a}){let o=e;return n?(0,c.jsx)(be,{tone:"error",children:n}):o?(0,c.jsxs)("div",{className:"dg-struct",children:[(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-fields",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("columns"),(0,c.jsx)("span",{className:"dg-badge",children:o.columns.length}),(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(ce,{icon:"refresh",title:t("refresh"),size:11,onClick:a})]}),(0,c.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:(0,c.jsxs)("table",{className:"dg-grid dg-grid-fixed",style:{width:"100%"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{style:{width:"30%"},children:t("name")}),(0,c.jsx)("th",{style:{width:"34%"},children:t("type")}),(0,c.jsx)("th",{style:{width:"12%"},children:t("nullable")}),(0,c.jsx)("th",{style:{width:"24%"},children:t("default")})]})}),(0,c.jsx)("tbody",{children:o.columns.map(r=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsxs)("span",{className:"dg-row",children:[r.primaryKey?(0,c.jsx)(k,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono dg-truncate",children:r.name})]})}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:r.type,children:r.type}),(0,c.jsx)("td",{children:r.nullable?"YES":"NO"}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:r.defaultValue??"",children:r.defaultValue===null?"\u2014":String(r.defaultValue)})]},r.name))})]})})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-indexes",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("indexes"),(0,c.jsx)("span",{className:"dg-badge",children:o.indexes.length})]}),(0,c.jsx)("div",{className:"dg-struct-body",children:o.indexes.length===0?(0,c.jsx)("div",{className:"dg-muted",children:t("noIndexes")}):o.indexes.map(r=>(0,c.jsxs)("div",{className:"dg-idx",children:[r.primary?(0,c.jsx)(k,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono",children:r.name}),(0,c.jsx)("span",{className:"dg-tag",children:r.unique?"unique":"index"}),(0,c.jsx)("span",{className:"dg-muted dg-truncate",children:r.columns.join(", ")})]},r.name))})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-ddl",children:[(0,c.jsx)("div",{className:"dg-struct-head",children:t("ddl")}),(0,c.jsx)("div",{className:"dg-struct-body",children:(0,c.jsx)("pre",{className:"dg-pre",children:o.ddl||"\u2014"})})]})]}):(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(we,{label:t("loading")})})}function gn(t,e){return`SELECT * FROM ${Ke(t,e)} LIMIT 100;`}var He=require("react");var q=require("react/jsx-runtime"),Qn={red:"var(--dsw-alias-state-error-primary)",yellow:"var(--dsw-alias-state-warn-primary)",green:"var(--dsw-alias-state-success-primary)"};function un(t){let{store:e,t:n}=t,a=ve(e.connections),o=ve(e.catalog),[r,m]=(0,He.useState)(""),[g,u]=(0,He.useState)(()=>new Set),[b,w]=(0,He.useState)(()=>new Set),[L,$]=(0,He.useState)(()=>new Set),N=(P,M)=>M(Y=>{let I=new Set(Y);return I.has(P)?I.delete(P):I.add(P),I}),O=r.trim().toLowerCase(),R=(0,He.useMemo)(()=>{let P=new Map;for(let M of a.items){let Y=M.group||n("noGroups"),I=P.get(Y)??[];I.push(M),P.set(Y,I)}return[...P.entries()].sort((M,Y)=>M[0].localeCompare(Y[0]))},[a.items,n]),B=async P=>{e.connections.select(P.id);let M=e.connections.session(P.id).status;if(M==="open"||M==="opening"){N(P.id,u);return}u(Y=>new Set(Y).add(P.id)),await e.connections.connect(P.id)},H=async(P,M)=>{t.onSelectDatabase(P,M);let Y=`${P.id}|${M.name}`;w(I=>new Set(I).add(Y)),P.engine!=="redis"&&await e.catalog.loadRelations(P.id,M.name,M.schemas[0]??"")},E=(P,M,Y,I)=>(0,q.jsxs)("div",{className:"dg-trow",style:{paddingLeft:Y?54:40},title:`${I.name}${I.rows!==null?` \xB7 ${I.rows} rows`:""}`,onClick:()=>t.onOpenTable(P,M,Y,I),children:[(0,q.jsx)("span",{className:"dg-twist"}),(0,q.jsx)("span",{className:"dg-ticon",children:(0,q.jsx)(k,{name:I.kind==="view"?"view":"table",size:11})}),(0,q.jsx)("span",{className:"dg-tlabel",children:I.name}),I.rows!==null?(0,q.jsx)("span",{className:"dg-badge",children:I.rows}):null]},`${P.id}|${M.name}|${Y}|${I.name}`),j=(P,M)=>{let Y=`${P.id}|${M.name}`,I=b.has(Y),te=M.schemas.length?M.schemas:[""];return(0,q.jsxs)("div",{children:[(0,q.jsxs)("div",{className:`dg-trow dg-trow-db${t.selectedDatabaseKey===Y?" dg-trow-active":""}`,style:{paddingLeft:26},title:M.name,onClick:()=>{H(P,M)},onContextMenu:_=>{_.preventDefault(),t.onDatabaseMenu(_,P,M)},children:[(0,q.jsx)("span",{className:`dg-twist${I?" dg-twist-open":""}`,onClick:_=>{_.stopPropagation(),N(Y,w),!I&&P.engine!=="redis"&&e.catalog.loadRelations(P.id,M.name,te[0]??"")},children:(0,q.jsx)(k,{name:"chevron",size:9})}),(0,q.jsx)("span",{className:"dg-ticon",children:(0,q.jsx)(k,{name:"database",size:11})}),(0,q.jsx)("span",{className:"dg-tlabel",children:M.name}),M.schemas.length>1?(0,q.jsx)("span",{className:"dg-badge",children:M.schemas.length}):null]}),I?te.map(_=>{let le=`${Y}|${_}`,me=!_||L.has(le),ye=o.relations[`${P.id}|${M.name}|${_}`]??[],v=o.loading[`${P.id}|${M.name}|${_}`]===!0;return(0,q.jsxs)("div",{children:[_?(0,q.jsxs)("div",{className:"dg-trow",style:{paddingLeft:40},onClick:()=>{N(le,$),me||e.catalog.loadRelations(P.id,M.name,_)},children:[(0,q.jsx)("span",{className:`dg-twist${me?" dg-twist-open":""}`,children:(0,q.jsx)(k,{name:"chevron",size:9})}),(0,q.jsx)("span",{className:"dg-ticon",children:(0,q.jsx)(k,{name:"folder",size:11})}),(0,q.jsx)("span",{className:"dg-tlabel",children:_})]}):null,me?v&&ye.length===0?(0,q.jsx)("div",{className:"dg-muted",style:{padding:`2px 8px 2px ${(_?54:40)+16}px`},children:n("loading")}):ye.map(J=>E(P,M,_,J)):null]},_||"_default")}):null]},Y)},[ee,Q]=(t.selectedDatabaseKey||"").split("|"),se=a.items.find(P=>P.id===ee),W=se?se.engine!=="redis":!1,G=!!(se&&Q&&W),ne=se&&Q?e.connections.session(se.id).databases.find(P=>P.name===Q)??{name:Q,schemas:[""]}:null;return(0,q.jsxs)("div",{className:"dg-tree",children:[(0,q.jsxs)("div",{className:"dg-panehead",children:[(0,q.jsx)(k,{name:"database",size:11}),n("connections"),(0,q.jsx)("span",{className:"dg-badge",children:a.items.length}),(0,q.jsx)("div",{className:"dg-spacer"}),t.onNewConnection?(0,q.jsx)(ce,{icon:"plus",title:n("newConnection"),size:11,onClick:t.onNewConnection}):null,t.onOpenWorkspaces?(0,q.jsx)(ce,{icon:"link",title:n("workspaces"),size:11,onClick:t.onOpenWorkspaces}):null,(0,q.jsx)(ce,{icon:"refresh",title:n("refresh"),size:11,onClick:()=>{e.connections.load(),e.meta.load()}})]}),(0,q.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,q.jsxs)("div",{className:"dg-search",children:[(0,q.jsx)(k,{name:"search",size:10}),(0,q.jsx)("input",{value:r,placeholder:n("search"),onChange:P=>m(P.target.value)})]}),G&&t.onNewQuery&&se&&ne?(0,q.jsxs)(K,{size:"sm",variant:"tonal",title:n("newQuery"),onClick:()=>t.onNewQuery?.(se,ne),children:[(0,q.jsx)(k,{name:"play",size:10}),n("newQuery")]}):null]}),(0,q.jsxs)("div",{className:"dg-tree-scroll",children:[a.loading&&a.items.length===0?(0,q.jsx)("div",{className:"dg-muted",style:{padding:8},children:n("loading")}):null,a.error?(0,q.jsx)("div",{className:"dg-banner dg-banner-error",children:a.error}):null,R.map(([P,M])=>{let Y=M.filter(I=>!O||I.name.toLowerCase().includes(O)?!0:e.connections.session(I.id).databases.some(_=>_.name.toLowerCase().includes(O)));return Y.length===0?null:(0,q.jsxs)("div",{children:[(0,q.jsxs)("div",{className:"dg-group",children:[(0,q.jsx)("span",{className:"dg-twist"}),(0,q.jsx)("span",{className:"dg-truncate",children:P}),(0,q.jsx)("span",{className:"dg-badge",children:Y.length})]}),Y.map(I=>{let te=e.connections.session(I.id),_=g.has(I.id)&&te.status==="open";return(0,q.jsxs)("div",{children:[(0,q.jsxs)("div",{className:`dg-trow${a.activeId===I.id?" dg-trow-active":""}`,style:{paddingLeft:12},onClick:()=>{B(I)},onContextMenu:le=>{le.preventDefault(),t.onConnectionMenu(le,I)},title:`${I.name} \xB7 ${I.engine}`,children:[(0,q.jsx)("span",{className:`dg-twist${_?" dg-twist-open":""}`,children:(0,q.jsx)(k,{name:"chevron",size:9})}),I.color!=="none"?(0,q.jsx)("span",{className:"dg-colorbar",style:{background:Qn[I.color]}}):null,(0,q.jsx)("span",{className:"dg-ticon",children:(0,q.jsx)(k,{name:"database",size:12})}),(0,q.jsx)("span",{className:"dg-tlabel",children:I.name}),(0,q.jsx)("span",{className:"dg-badge",children:I.engine}),(0,q.jsx)(Gt,{status:te.status})]}),te.status==="opening"?(0,q.jsxs)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 34px"},children:[n("connect"),"\u2026"]}):null,te.status==="error"?(0,q.jsx)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 34px"},children:te.error||n("error")}):null,_?te.databases.map(le=>j(I,le)):null]},I.id)})]},P)}),!a.loading&&a.items.length===0?(0,q.jsx)("div",{className:"dg-muted dg-hint",style:{padding:10},children:n("selectConnection")}):null]})]})}var A=require("react/jsx-runtime"),Vn=[{id:"tables",labelKey:"tables",icon:"table",target:"relations",relation:"table"},{id:"views",labelKey:"views",icon:"view",target:"relations",relation:"view"},{id:"functions",labelKey:"functions",icon:"function",target:"routines"},{id:"users",labelKey:"users",icon:"user",target:"accounts"},{id:"queries",labelKey:"queries",icon:"bookmark",target:"queries"}];function pn({t}){let e=t??(i=>i),[n]=(0,Ce.useState)(()=>new Ze),a=ve(n.connections),o=ve(n.meta),r=ve(n.tabs),[m,g]=(0,Ce.useState)(null),[u,b]=(0,Ce.useState)(null),[w,L]=(0,Ce.useState)(null),[$,N]=(0,Ce.useState)(null),[O,R]=(0,Ce.useState)(null),[B,H]=(0,Ce.useState)(262);(0,Ce.useEffect)(()=>{n.bootstrap()},[n]),(0,Ce.useEffect)(()=>{if(!O)return;let i=setTimeout(()=>R(null),3600);return()=>clearTimeout(i)},[O]);let E=(i,d="info")=>R({message:i,tone:d}),j=i=>a.items.find(d=>d.id===i),ee=i=>j(i)?.engine??"sqlite",Q=(i,d)=>{let x=d.schemas[0]??"";if(g({connectionId:i.id,database:d.name,schema:x}),i.engine==="redis"){n.tabs.open({id:`redis:${i.id}:${d.name}`,kind:"redis",connectionId:i.id,database:d.name,title:d.name});return}n.catalog.loadRelations(i.id,d.name,x),n.tabs.open({id:`relations:${i.id}:${d.name}:${x}:table`,kind:"relations",connectionId:i.id,database:d.name,schema:x,relation:"table",title:d.name})},se=(i,d)=>{g({connectionId:i.id,database:d.name,schema:d.schemas[0]??""}),n.tabs.open({id:`overview:${i.id}:${d.name}`,kind:"overview",connectionId:i.id,database:d.name,title:d.name})},W=(i,d,x,z)=>{n.tabs.open({id:`table:${i.id}:${d}:${x}:${z.name}`,kind:"table",connectionId:i.id,database:d,schema:x,table:z.name,tableKind:z.kind,title:z.name})},G=(i,d="table",x=m)=>{if(i==="queries"){n.tabs.open({id:"queries",kind:"queries",connectionId:"",database:"",schema:"",title:e("queries")});return}if(!x)return E(e("selectDatabase"),"info");if(i==="accounts"){n.tabs.open({id:`accounts:${x.connectionId}`,kind:"accounts",connectionId:x.connectionId,database:x.database,schema:"",title:e("users")});return}if(i==="relations"){n.tabs.open({id:`relations:${x.connectionId}:${x.database}:${x.schema}:${d}`,kind:"relations",connectionId:x.connectionId,database:x.database,schema:x.schema,relation:d,title:x.database});return}n.tabs.open({id:`${i}:${x.connectionId}:${x.database}:${x.schema}`,kind:i,connectionId:x.connectionId,database:x.database,schema:x.schema,title:e(i==="routines"?"functions":"users")})},ne=(i,d,x)=>{let z=i??(m?j(m.connectionId):null);if(!z||z.engine==="redis")return;let X=d??(m&&m.connectionId===z.id?m.database:n.connections.session(z.id).databases[0]?.name??"");if(!X)return;let ge=r.tabs.filter(xe=>xe.kind==="sql").length+1;n.tabs.open({id:`sql:${z.id}:${X}:${Date.now()}`,kind:"sql",connectionId:z.id,database:X,title:`${e("query")} ${ge} (${X})`,initialSql:x??""})},P=i=>{let d=j(i.connectionId)??a.items[0];if(!d)return b({kind:"connection"});n.tabs.open({id:`sql:saved:${i.id}:${Date.now()}`,kind:"sql",connectionId:d.id,database:i.database,title:i.name,initialSql:i.sql})},M=async i=>{let d=u&&u.kind==="connection"?u.initial:void 0;if(d)await n.connections.update(d.id,i),n.tabs.closeConnection(d.id),E(e("saved"),"success");else{let x=await n.connections.create(i);E(x.ok?fe(e("testOk"),{version:x.serverVersion??"",ms:x.latencyMs??0}):e("saved"),x.ok?"success":"info")}b(null)},Y=(i,d)=>{let x=n.connections.session(d.id).status;N({x:i.clientX,y:i.clientY,items:[x==="open"?{label:e("disconnect"),icon:"unplug",onClick:()=>{n.connections.disconnect(d.id)}}:{label:e("connect"),icon:"plug",onClick:()=>{n.connections.connect(d.id)}},{label:e("test"),icon:"check",onClick:()=>{n.connections.test(d.id).then(z=>E(fe(e("testOk"),{version:z.serverVersion??"",ms:z.latencyMs??0}),"success"),z=>E(z instanceof Error?z.message:String(z),"error"))}},{separator:!0},...d.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>ne(d)}]:[],{label:e("edit"),icon:"pencil",onClick:()=>b({kind:"connection",initial:d})},{label:e("refresh"),icon:"refresh",onClick:()=>{n.connections.reloadDatabases(d.id)}},{separator:!0},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>L(d)}]})},I=(i,d,x)=>{let z={connectionId:d.id,database:x.name,schema:x.schemas[0]??""},X=(ge,xe="table")=>{g(z),G(ge,xe,z)};N({x:i.clientX,y:i.clientY,items:[{label:e("overview"),icon:"info",onClick:()=>se(d,x)},{label:e("tables"),icon:"table",onClick:()=>X("relations","table")},{label:e("views"),icon:"view",onClick:()=>X("relations","view")},{label:e("functions"),icon:"function",onClick:()=>X("routines")},{separator:!0},...d.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>ne(d,x.name)}]:[]]})},te=n.bindings(),_=m?`${m.connectionId}|${m.database}`:"",le=r.tabs.find(i=>i.id===r.activeId)??null,me=(0,A.jsxs)("div",{className:"dg-toolbar",children:[(0,A.jsxs)("div",{className:"dg-brand",children:[(0,A.jsx)("span",{className:"dg-brand-badge",children:(0,A.jsx)(k,{name:"database",size:15})}),(0,A.jsx)("span",{className:"dg-brand-title",children:e("panel")})]}),(0,A.jsx)("div",{className:"dg-toolbar-divider"}),(0,A.jsx)("div",{className:"dg-toolgroup dg-obj-pills",children:Vn.map(i=>(0,A.jsxs)(K,{size:"sm",variant:"ghost",onClick:()=>G(i.target,i.relation),title:e(i.labelKey),children:[(0,A.jsx)(k,{name:i.icon,size:11}),e(i.labelKey)]},i.id))})]}),ye=(i,d)=>{i.preventDefault(),i.stopPropagation();let x=r.tabs.findIndex(ze=>ze.id===d.id),z=r.tabs.length,X=x>0,ge=x<z-1,xe=z>1,$e=[{label:e("closeThisTab"),icon:"x",onClick:()=>n.tabs.close(d.id)},{label:e("closeOtherTabs"),disabled:!xe,onClick:()=>n.tabs.closeOthers(d.id)},{label:e("closeTabsToRight"),disabled:!ge,onClick:()=>n.tabs.closeToRight(d.id)},{label:e("closeTabsToLeft"),disabled:!X,onClick:()=>n.tabs.closeToLeft(d.id)},{separator:!0},{label:e("closeAllTabs"),onClick:()=>n.tabs.closeAll()}];N({x:i.clientX,y:i.clientY,items:$e})},v=r.tabs.length?(0,A.jsx)("div",{className:"dg-tabs",role:"tablist",children:r.tabs.map(i=>(0,A.jsxs)("div",{role:"tab",tabIndex:i.id===r.activeId?0:-1,"aria-selected":i.id===r.activeId,className:`dg-tab${i.id===r.activeId?" dg-tab-active":""}`,onClick:()=>n.tabs.activate(i.id),onContextMenu:d=>ye(d,i),onKeyDown:d=>{if(d.key==="Enter"||d.key===" "){d.preventDefault(),n.tabs.activate(i.id);return}let x=d.key==="ArrowRight"?1:d.key==="ArrowLeft"?-1:0;if(x===0)return;d.preventDefault();let z=d.currentTarget.parentElement?.children,X=z?.length??0;if(!X)return;let ge=r.tabs[(r.tabs.findIndex(xe=>xe.id===i.id)+x+X)%X];ge&&(n.tabs.activate(ge.id),z?.[r.tabs.indexOf(ge)]?.focus())},title:i.title,children:[(0,A.jsx)(k,{name:i.kind==="table"?i.tableKind==="view"?"view":"table":i.kind==="sql"?"play":i.kind==="queries"?"bookmark":i.kind==="redis"?"database":"info",size:10}),(0,A.jsx)("span",{className:"dg-tab-label",children:i.title}),(0,A.jsx)("button",{type:"button",className:"dg-tab-close","aria-label":`${e("close")} ${i.title}`,onClick:d=>{d.stopPropagation(),n.tabs.close(i.id)},children:(0,A.jsx)(k,{name:"x",size:9})})]},i.id))}):null,J=r.tabs.map(i=>{let d=j(i.connectionId),x=(()=>{switch(i.kind){case"overview":{let z=n.connections.session(i.connectionId).databases.find(X=>X.name===i.database);return z?(0,A.jsx)(an,{t:e,store:n,connectionId:i.connectionId,database:z,schemas:z.schemas,onOpenRelations:X=>G("relations",X),onNewQuery:()=>ne(d,i.database)}):null}case"table":return(0,A.jsx)(cn,{t:e,tab:i,engine:ee(i.connectionId),notify:E,onNewQuery:()=>ne(d,i.database)});case"sql":return(0,A.jsx)(dn,{t:e,tab:i,tables:n.catalog.relationsOf(`${i.connectionId}|${i.database}|`).map(z=>z.name),notify:E,onSaved:()=>{n.queries.load()}});case"relations":return(0,A.jsx)(nn,{t:e,store:n,connectionId:i.connectionId,database:i.database,schema:i.schema,kind:i.relation,onOpen:z=>{d&&W(d,i.database,i.schema,z)},onQuery:z=>ne(d,i.database,gn(ee(i.connectionId),z.name)),onNewQuery:()=>ne(d,i.database),notify:E});case"routines":return(0,A.jsx)(sn,{t:e,store:n,connectionId:i.connectionId,database:i.database,schema:i.schema});case"accounts":return(0,A.jsx)(rn,{t:e,store:n,connectionId:i.connectionId});case"queries":return(0,A.jsx)(on,{t:e,store:n,onOpen:P,notify:E});case"redis":return(0,A.jsx)(ln,{t:e,tab:i,notify:E});default:return null}})();return(0,A.jsx)("div",{className:"dg-pane",style:{display:i.id===r.activeId?"contents":"none"},"aria-hidden":i.id!==r.activeId,children:x},i.id)}),f=(0,A.jsxs)("div",{className:"dg-status",children:[a.activeId?(0,A.jsxs)("span",{className:"dg-status-item",children:[(0,A.jsx)(k,{name:"database",size:10}),(0,A.jsx)("b",{children:j(a.activeId)?.name??""}),(0,A.jsx)("span",{children:n.connections.session(a.activeId).version||j(a.activeId)?.engine||""})]}):(0,A.jsx)("span",{className:"dg-status-item",children:e("selectConnection")}),m?(0,A.jsxs)("span",{className:"dg-status-item",children:[(0,A.jsx)("span",{children:m.database}),m.schema?(0,A.jsxs)("span",{children:["\xB7 ",m.schema]}):null]}):null,(0,A.jsx)("div",{className:"dg-spacer"}),te.length>0?(0,A.jsxs)("span",{className:"dg-status-item",children:[e("boundProject"),": ",te.length]}):null,(0,A.jsx)("span",{className:"dg-status-item",children:le?le.kind:"ready"})]});return(0,A.jsxs)("div",{className:"dg-root",children:[(0,A.jsx)("style",{children:Zt}),me,o.error?(0,A.jsx)(be,{tone:"error",onClose:()=>{n.meta.load()},children:o.error}):null,(0,A.jsxs)("div",{className:"dg-body",children:[(0,A.jsx)("div",{style:{width:B,flex:`0 0 ${B}px`,display:"flex",minWidth:0},children:(0,A.jsx)(un,{store:n,t:e,selectedDatabaseKey:_,onNewConnection:()=>b({kind:"connection"}),onOpenWorkspaces:()=>b({kind:"workspaces"}),onSelectDatabase:Q,onOpenTable:(i,d,x,z)=>W(i,d.name,x,z),onConnectionMenu:Y,onDatabaseMenu:I,onNewQuery:(i,d)=>ne(i,d.name)})}),(0,A.jsx)(_t,{width:B,setWidth:H,min:200,max:420}),(0,A.jsxs)("div",{className:"dg-main",children:[v,r.tabs.length===0?(0,A.jsx)(he,{title:e("selectConnection"),hint:e("agentHint"),children:(0,A.jsxs)("div",{className:"dg-welcome-actions",children:[(0,A.jsxs)(K,{className:"dg-btn-new-conn",onClick:()=>b({kind:"connection"}),children:[(0,A.jsx)(k,{name:"plus",size:11}),e("newConnection")]}),(0,A.jsxs)(K,{variant:"ghost",onClick:()=>b({kind:"workspaces"}),children:[(0,A.jsx)(k,{name:"link",size:11}),e("workspaces")]})]})}):null,J,O?(0,A.jsxs)("div",{className:`dg-toast${O.tone==="error"?" dg-toast-error":""}`,children:[(0,A.jsx)(k,{name:O.tone==="error"?"alert":"check",size:11}),(0,A.jsx)("span",{className:"dg-truncate",children:O.message})]}):null]})]}),f,u&&u.kind==="connection"?(0,A.jsx)(en,{t:e,engines:o.meta?.engines??[],initial:u.initial??null,onClose:()=>b(null),onSave:M}):null,u&&u.kind==="workspaces"?(0,A.jsx)(tn,{t:e,store:n,onClose:()=>b(null),notify:E}):null,w?(0,A.jsx)(je,{x:window.innerWidth/2,y:window.innerHeight/2,onClose:()=>L(null),items:[{label:e("confirmDeleteConnection"),disabled:!0},{separator:!0},{label:e("cancel"),onClick:()=>L(null)},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>{let i=w;L(null),n.connections.remove(i.id).catch(d=>E(d instanceof Error?d.message:String(d),"error"))}}]}):null,$?(0,A.jsx)(je,{x:$.x,y:$.y,items:$.items,onClose:()=>N(null)}):null]})}var De=require("react/jsx-runtime"),at="grid",mn="grid";function Wn({size:t=20,active:e}){return(0,De.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,focusable:"false",children:[(0,De.jsx)("ellipse",{cx:"12",cy:"5.6",rx:"7.1",ry:"2.9",stroke:"currentColor",strokeWidth:1.5}),(0,De.jsx)("path",{d:"M4.9 5.6v12.8c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9V5.6",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round"}),(0,De.jsx)("path",{d:"M4.9 9.9c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,De.jsx)("path",{d:"M4.9 14.2c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,De.jsx)("rect",{x:"10.55",y:"9.55",width:"2.9",height:"10.9",rx:"1.2",fill:"var(--dsw-alias-brand-primary)",opacity:e===!1?.55:.9})]})}function Jn(t){t.effect(()=>t.locale.register(at,qt),"grid: dictionaries");let e=t.locale.bind(at);t.slots.inject("main",()=>t.slots.register({name:"main",key:mn,locale:at},pn)),t.slots.inject("sidebar.panellist",()=>t.slots.register({name:"sidebar.panellist",id:mn,order:15,label:()=>e("panel"),locale:at},Wn))}var Un={inject:["slots","locale"],apply:Jn};

    return module.exports.default || module.exports;
  },
});
