window.__ModuleLoader__.load({
  id: '@local/dsh-grid',
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
"use strict";var ut=Object.defineProperty;var En=Object.getOwnPropertyDescriptor;var Tn=Object.getOwnPropertyNames;var zn=Object.prototype.hasOwnProperty;var Rn=(t,e)=>{for(var n in e)ut(t,n,{get:e[n],enumerable:!0})},In=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let d of Tn(e))!zn.call(t,d)&&d!==n&&ut(t,d,{get:()=>e[d],enumerable:!(a=En(e,d))||a.enumerable});return t};var Mn=t=>In(ut({},"__esModule",{value:!0}),t);var _n={};Rn(_n,{default:()=>Xn});module.exports=Mn(_n);var Pn={meta:{title:"Grid",description:"Database workbench: connections with groups, colours and TLS modes, a schema browser, an editable data grid, a SQL console with completion, and saved queries \u2014 plus read-only database context for the agent."},panel:"Grid",connections:"Connections",tabGeneral:"General",tabSsh:"SSH Tunnel",tabSsl:"SSL / TLS",workspaces:"Workspaces",noWorkspaces:"No workspace is registered in this profile yet.",databases:"Databases",newConnection:"New connection",newQuery:"New query",tables:"Tables",views:"Views",functions:"Functions",users:"Users",queries:"Queries",overview:"Overview",connect:"Connect",disconnect:"Disconnect",test:"Test",edit:"Edit",delete:"Delete",refresh:"Refresh",save:"Save",cancel:"Cancel",close:"Close",confirm:"Confirm",apply:"Apply",clear:"Clear",search:"Search\u2026",loading:"Loading\u2026",error:"Error",name:"Name",type:"Type",comment:"Comment",rows:"Rows",estimatedTotal:"The engine estimated this row count; Refresh asks for an exact count.",size:"Size",total:"Total",selectConnection:"Select a connection on the left to begin.",selectDatabase:"Select a database to list its objects.",emptyTables:"No tables or views in this database.",emptyTable:"This table is empty.",emptyResult:"The query returned no rows.",emptyObjects:"Nothing here yet.",data:"Data",structure:"Structure",columns:"Columns",indexes:"Indexes",ddl:"DDL",noIndexes:"No indexes.",nullable:"Nullable",default:"Default",primaryKey:"PK",insertRow:"Insert row",editRow:"Edit row",rowSaved:"Row saved",rowInserted:"Row inserted",insertRowFailed:"The row could not be inserted with its defaults.",deleteRow:"Delete row",confirmDelete:"Delete this row?",confirmDeleteConnection:"Delete this connection? Its saved password is removed too.",confirmDeleteKey:"Delete this key?",noPrimaryKey:"This table has no primary key, so rows cannot be located safely. Editing is disabled.",cellSaved:"Saved",deleted:"Deleted",saved:"Saved",copied:"Copied",page:"Page {page} of {pages}",pageSize:"Rows per page",prev:"Previous",next:"Next",selection:"Selection {n}",sum:"Sum",avg:"Avg",count:"Count",exportCsv:"Export CSV",exportJson:"Export JSON",exportInsert:"Export INSERT statements",exportMarkdown:"Export Markdown table",exportAs:"Export",importCsv:"Import CSV",importDone:"Imported {n} row(s)",importEmpty:"That file has no rows.",importNoColumns:"Open the table first so its column names are known.",importUnknownColumns:"The file has columns this table does not: {cols}",importFailed:"Imported {n} row(s), then stopped: {error}",exportTruncated:"Export limited to {n} rows",filter:"Filter",filterBuilder:"Filter builder",rawWhere:"Raw WHERE",addCondition:"Add condition",matchAll:"Match all",matchAny:"Match any",columnChooser:"Columns",showAll:"Show all",resetWidths:"Reset widths",run:"Run",cancelQuery:"Cancel",queryCancelled:"Cancelled",cancelUnsupported:"This engine cannot cancel a running statement.",runHint:"Ctrl/Cmd + Enter to run",explain:"Explain",beautify:"Beautify",history:"History",noHistory:"No queries yet.",result:"Result {n}",statementCount:"{n} statement(s)",queryOk:"{n} row(s) in {ms} ms",resultTruncated:"The result was capped: only the first 2 000 rows are shown.",queryFailed:"Failed after {ms} ms",affected:"{n} row(s) affected",noStatements:"Nothing to run.",completionHint:"Ctrl + Space for completion",readOnlyHint:"Read-only statements only",redisKeys:"Keys",redisPattern:"Pattern",redisType:"Type",scanMore:"Scan more",ttl:"TTL",noTtl:"no expiry",keyValue:"Value",command:"Command",commandHint:"e.g. GET user:1",reply:"Reply",deleteKey:"Delete key",newKey:"New key",setTtl:"Set TTL",rename:"Rename",editValue:"Edit value",saveQuery:"Save query",queryName:"Query name",querySaved:"Query saved",noQueries:"No saved queries yet. Save one from the SQL console, or ask the agent to.",openInEditor:"Open in editor",runQuery:"Run",source:"Source",bindProject:"Bind to this project",unbindProject:"Unbind project",projectBound:"This conversation can read {name} ({database}) without asking.",projectUnbound:"Not bound to this workspace. The agent has to ask which connection to use.",readOnlyForAgent:"Agent access is read-only",agentHint:"The agent can list, inspect and query these connections with grid_* tools, and save queries for you.",functionKind:"Function",procedureKind:"Procedure",returnType:"Returns",language:"Language",definition:"Definition",noRoutines:"No functions or procedures.",accountName:"User",accountHost:"Host",accountPlugin:"Plugin",accountLocked:"Locked",accountPrivileged:"Privileged",noAccounts:"No accounts are visible to this connection.",driverMissing:"The {engine} driver is not installed. Run `pnpm add {pkg}` in the plugin directory.",engineUnavailable:"Unavailable",testOk:"Connection works \xB7 {version} \xB7 {ms} ms",testFailed:"Connection failed: {error}",passwordKeep:"Leave blank to keep the saved password",secretKeep:"Saved credential exists. Leave blank to keep it; use Clear credential to remove it.",secretClear:"Clear credential",secretUndoClear:"Undo clear",secretClearPending:"This credential will be cleared on save. Typing a replacement cancels the clear.",sshSection:"SSH tunnel",sshEnable:"Connect through SSH",sshSingleHopHint:"Single jump host only. All SSH server fields and a pinned fingerprint are required.",sshHost:"SSH host",sshPort:"SSH port",sshUsername:"SSH user",sshAuthType:"SSH authentication",sshAuthPassword:"Password",sshAuthPrivateKey:"Private key",sshHostFingerprint:"Pinned SSH host fingerprint",sshFingerprintHint:"Obtain the SHA256:\u2026 host fingerprint from your administrator through a trusted channel. It is never discovered or trusted automatically.",sshPassword:"SSH password",sshPrivateKey:"SSH private key",sshPrivateKeyHint:"Paste the complete private key. Saved private keys are never read back; no host file path is read.",sshPassphrase:"Private key passphrase (optional)",sshDatabaseHostHint:"Database host is resolved from the SSH jump host. 127.0.0.1 means the jump host itself.",sshSecurityHint:"SSH does not replace database TLS. Keep database TLS enabled when required and use the database server name for certificate verification.",sshDisableHint:"Saving with SSH off removes the saved tunnel settings and SSH credentials.",sshFieldsRequired:"SSH host, user, authentication method and a pinned SHA256 host fingerprint are required.",sshPortInvalid:"SSH port must be a whole number from 1 to 65535.",sshFingerprintInvalid:"Enter a pinned SHA256 host fingerprint (SHA256: followed by 43 base64 characters, optionally ending in =).",tlsServerName:"TLS server name",tlsServerNameHint:"Leave blank to use the database host. This is the database certificate name, not the SSH host or a local forwarding address.",sqlserverVerifyCaUnsupported:"SQL Server cannot verify the certificate chain without host-name verification. Choose full verification or another supported TLS mode.",engine:"Engine",host:"Host",port:"Port",user:"User",password:"Password",database:"Database",schema:"Schema",file:"Database file",redisDb:"Database index",color:"Environment colour",identity:"Identity",group:"Group",sslDisable:"TLS off",sslRequire:"TLS, certificate not verified",sslVerifyCa:"TLS, verify certificate chain",sslVerifyFull:"TLS, verify certificate and host name",connectionLost:"Connection lost \u2014 reconnect failed.",bannerTools:"The agent can inspect and query these connections.",writesEnabled:"Writes enabled for the agent",writesDisabled:"Read-only for the agent",unsaved:"Unsaved",copyName:"Copy name",openInQuery:"Open in query",tablesCount:"{n} table(s)",viewsCount:"{n} view(s)",routinesCount:"{n} routine(s)",server:"Server",updatedAt:"Updated",version:"Version",boundProject:"Project",noGroups:"Ungrouped"},$n={meta:{title:"Grid \u6570\u636E\u5E93",description:"\u6570\u636E\u5E93\u5DE5\u4F5C\u53F0\uFF1A\u8FDE\u63A5\uFF08\u5206\u7EC4+\u73AF\u5883\u8272\uFF09\u3001\u5E93\u8868\u6D4F\u89C8\u3001\u53EF\u7F16\u8F91\u6570\u636E\u7F51\u683C\u3001\u5E26\u8865\u5168\u7684 SQL \u63A7\u5236\u53F0\u3001\u67E5\u8BE2\u4FDD\u5B58\u4E0E\u5907\u4EFD\uFF0C\u5E76\u5411 Agent \u63D0\u4F9B\u53EA\u8BFB\u5E93\u4E0A\u4E0B\u6587\u3002"},panel:"\u6570\u636E\u5E93",connections:"\u8FDE\u63A5",tabGeneral:"\u5E38\u89C4",tabSsh:"SSH \u96A7\u9053",tabSsl:"SSL / TLS",workspaces:"\u5DE5\u4F5C\u533A",noWorkspaces:"\u8FD9\u4E2A profile \u91CC\u8FD8\u6CA1\u6709\u6CE8\u518C\u5DE5\u4F5C\u533A\u3002",databases:"\u6570\u636E\u5E93",newConnection:"\u65B0\u5EFA\u8FDE\u63A5",newQuery:"\u65B0\u5EFA\u67E5\u8BE2",tables:"\u8868",views:"\u89C6\u56FE",functions:"\u51FD\u6570",users:"\u7528\u6237",queries:"\u67E5\u8BE2",overview:"\u6982\u89C8",connect:"\u8FDE\u63A5",disconnect:"\u65AD\u5F00",test:"\u6D4B\u8BD5",edit:"\u7F16\u8F91",delete:"\u5220\u9664",refresh:"\u5237\u65B0",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",confirm:"\u786E\u5B9A",apply:"\u5E94\u7528",clear:"\u6E05\u7A7A",search:"\u641C\u7D22\u2026",loading:"\u52A0\u8F7D\u4E2D\u2026",error:"\u9519\u8BEF",name:"\u540D\u79F0",type:"\u7C7B\u578B",comment:"\u6CE8\u91CA",rows:"\u884C\u6570",estimatedTotal:"\u8BE5\u884C\u6570\u6765\u81EA\u5F15\u64CE\u4F30\u7B97\uFF1B\u70B9\u5237\u65B0\u53EF\u83B7\u53D6\u7CBE\u786E\u503C\u3002",size:"\u5927\u5C0F",total:"\u5408\u8BA1",selectConnection:"\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u8FDE\u63A5\u5F00\u59CB\u3002",selectDatabase:"\u9009\u62E9\u4E00\u4E2A\u6570\u636E\u5E93\u6765\u5217\u51FA\u5B83\u7684\u5BF9\u8C61\u3002",emptyTables:"\u8FD9\u4E2A\u6570\u636E\u5E93\u91CC\u6CA1\u6709\u8868\u6216\u89C6\u56FE\u3002",emptyTable:"\u8FD9\u5F20\u8868\u8FD8\u6CA1\u6709\u6570\u636E\u3002",emptyResult:"\u67E5\u8BE2\u6CA1\u6709\u8FD4\u56DE\u4EFB\u4F55\u884C\u3002",emptyObjects:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u5185\u5BB9\u3002",data:"\u6570\u636E",structure:"\u7ED3\u6784",columns:"\u5B57\u6BB5",indexes:"\u7D22\u5F15",ddl:"DDL",noIndexes:"\u6CA1\u6709\u7D22\u5F15\u3002",nullable:"\u53EF\u7A7A",default:"\u9ED8\u8BA4\u503C",primaryKey:"\u4E3B\u952E",insertRow:"\u63D2\u5165\u884C",editRow:"\u7F16\u8F91\u884C",rowSaved:"\u884C\u5DF2\u4FDD\u5B58",rowInserted:"\u5DF2\u63D2\u5165\u4E00\u884C",insertRowFailed:"\u65E0\u6CD5\u7528\u9ED8\u8BA4\u503C\u63D2\u5165\u65B0\u884C\u3002",deleteRow:"\u5220\u9664\u884C",confirmDelete:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E00\u884C\uFF1F",confirmDeleteConnection:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8FDE\u63A5\uFF1F\u4FDD\u5B58\u7684\u5BC6\u7801\u4E5F\u4F1A\u4E00\u5E76\u5220\u9664\u3002",confirmDeleteKey:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u952E\uFF1F",noPrimaryKey:"\u8BE5\u8868\u6CA1\u6709\u4E3B\u952E\uFF0C\u65E0\u6CD5\u5B89\u5168\u5B9A\u4F4D\u884C\uFF0C\u7F16\u8F91\u5DF2\u7981\u7528\u3002",cellSaved:"\u5DF2\u4FDD\u5B58",deleted:"\u5DF2\u5220\u9664",saved:"\u5DF2\u4FDD\u5B58",copied:"\u5DF2\u590D\u5236",page:"\u7B2C {page} / {pages} \u9875",pageSize:"\u6BCF\u9875\u884C\u6570",prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875",selection:"\u9009\u533A {n}",sum:"\u5408\u8BA1",avg:"\u5E73\u5747",count:"\u8BA1\u6570",exportCsv:"\u5BFC\u51FA CSV",exportJson:"\u5BFC\u51FA JSON",exportInsert:"\u5BFC\u51FA INSERT \u8BED\u53E5",exportMarkdown:"\u5BFC\u51FA Markdown \u8868\u683C",exportAs:"\u5BFC\u51FA",importCsv:"\u5BFC\u5165 CSV",importDone:"\u5DF2\u5BFC\u5165 {n} \u884C",importEmpty:"\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u6570\u636E\u884C\u3002",importNoColumns:"\u8BF7\u5148\u6253\u5F00\u8BE5\u8868\uFF0C\u4EE5\u4FBF\u77E5\u9053\u5217\u540D\u3002",importUnknownColumns:"\u6587\u4EF6\u91CC\u6709\u672C\u8868\u4E0D\u5B58\u5728\u7684\u5217\uFF1A{cols}",importFailed:"\u5DF2\u5BFC\u5165 {n} \u884C\uFF0C\u968F\u540E\u4E2D\u65AD\uFF1A{error}",exportTruncated:"\u5BFC\u51FA\u4E0A\u9650\u4E3A {n} \u884C",filter:"\u7B5B\u9009",filterBuilder:"\u7B5B\u9009\u6784\u5EFA\u5668",rawWhere:"\u539F\u59CB WHERE",addCondition:"\u6DFB\u52A0\u6761\u4EF6",matchAll:"\u5168\u90E8\u6EE1\u8DB3",matchAny:"\u4EFB\u4E00\u6EE1\u8DB3",columnChooser:"\u5B57\u6BB5\u663E\u793A",showAll:"\u5168\u90E8\u663E\u793A",resetWidths:"\u91CD\u7F6E\u5217\u5BBD",run:"\u6267\u884C",cancelQuery:"\u53D6\u6D88\u6267\u884C",queryCancelled:"\u5DF2\u53D6\u6D88",cancelUnsupported:"\u8BE5\u5F15\u64CE\u65E0\u6CD5\u53D6\u6D88\u6B63\u5728\u6267\u884C\u7684\u8BED\u53E5\u3002",runHint:"Ctrl/Cmd + Enter \u6267\u884C",explain:"\u89E3\u91CA",beautify:"\u7F8E\u5316",history:"\u5386\u53F2",noHistory:"\u8FD8\u6CA1\u6709\u6267\u884C\u8FC7\u67E5\u8BE2\u3002",result:"\u7ED3\u679C {n}",statementCount:"{n} \u6761\u8BED\u53E5",queryOk:"{n} \u884C\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",resultTruncated:"\u7ED3\u679C\u5DF2\u622A\u65AD\uFF1A\u53EA\u663E\u793A\u524D 2 000 \u884C\u3002",queryFailed:"\u5931\u8D25\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",affected:"\u5F71\u54CD {n} \u884C",noStatements:"\u6CA1\u6709\u53EF\u6267\u884C\u7684\u5185\u5BB9\u3002",completionHint:"Ctrl + Space \u5524\u8D77\u8865\u5168",readOnlyHint:"\u4EC5\u53EA\u8BFB\u8BED\u53E5",redisKeys:"\u952E",redisPattern:"\u5339\u914D\u6A21\u5F0F",redisType:"\u7C7B\u578B",scanMore:"\u7EE7\u7EED\u626B\u63CF",ttl:"\u5269\u4F59\u65F6\u95F4",noTtl:"\u6C38\u4E0D\u8FC7\u671F",keyValue:"\u503C",command:"\u547D\u4EE4",commandHint:"\u4F8B\u5982 GET user:1",reply:"\u8FD4\u56DE",deleteKey:"\u5220\u9664\u952E",newKey:"\u65B0\u5EFA\u952E",setTtl:"\u8BBE\u7F6E TTL",rename:"\u91CD\u547D\u540D",editValue:"\u7F16\u8F91\u503C",saveQuery:"\u4FDD\u5B58\u67E5\u8BE2",queryName:"\u67E5\u8BE2\u540D\u79F0",querySaved:"\u67E5\u8BE2\u5DF2\u4FDD\u5B58",noQueries:"\u8FD8\u6CA1\u6709\u4FDD\u5B58\u7684\u67E5\u8BE2\u3002\u53EF\u4EE5\u5728 SQL \u63A7\u5236\u53F0\u91CC\u4FDD\u5B58\uFF0C\u4E5F\u53EF\u4EE5\u8BA9 Agent \u5E2E\u4F60\u4FDD\u5B58\u3002",openInEditor:"\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00",runQuery:"\u6267\u884C",source:"\u6765\u6E90",bindProject:"\u7ED1\u5B9A\u5230\u5F53\u524D\u9879\u76EE",unbindProject:"\u89E3\u9664\u9879\u76EE\u7ED1\u5B9A",projectBound:"\u672C\u6B21\u5BF9\u8BDD\u53EF\u4EE5\u76F4\u63A5\u8BFB\u53D6 {name}\uFF08{database}\uFF09\uFF0C\u65E0\u9700\u53CD\u590D\u786E\u8BA4\u3002",projectUnbound:"\u5C1A\u672A\u7ED1\u5B9A\u5230\u5F53\u524D\u5DE5\u4F5C\u533A\uFF0CAgent \u9700\u8981\u5148\u8BE2\u95EE\u4F7F\u7528\u54EA\u4E2A\u8FDE\u63A5\u3002",readOnlyForAgent:"Agent \u8BBF\u95EE\u4E3A\u53EA\u8BFB",agentHint:"Agent \u53EF\u4EE5\u901A\u8FC7 grid_* \u5DE5\u5177\u5217\u51FA\u3001\u68C0\u67E5\u3001\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\uFF0C\u4E5F\u80FD\u66FF\u4F60\u4FDD\u5B58\u67E5\u8BE2\u3002",functionKind:"\u51FD\u6570",procedureKind:"\u5B58\u50A8\u8FC7\u7A0B",returnType:"\u8FD4\u56DE\u7C7B\u578B",language:"\u8BED\u8A00",definition:"\u5B9A\u4E49",noRoutines:"\u6CA1\u6709\u51FD\u6570\u6216\u5B58\u50A8\u8FC7\u7A0B\u3002",accountName:"\u7528\u6237",accountHost:"\u4E3B\u673A",accountPlugin:"\u8BA4\u8BC1\u63D2\u4EF6",accountLocked:"\u5DF2\u9501\u5B9A",accountPrivileged:"\u7279\u6743",noAccounts:"\u8BE5\u8FDE\u63A5\u770B\u4E0D\u5230\u7528\u6237\u5217\u8868\u3002",driverMissing:"\u672A\u5B89\u88C5 {engine} \u9A71\u52A8\uFF0C\u8BF7\u5728\u63D2\u4EF6\u76EE\u5F55\u6267\u884C `pnpm add {pkg}`\u3002",engineUnavailable:"\u4E0D\u53EF\u7528",testOk:"\u8FDE\u63A5\u6210\u529F \xB7 {version} \xB7 {ms} \u6BEB\u79D2",testFailed:"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}",passwordKeep:"\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u5DF2\u4FDD\u5B58\u7684\u5BC6\u7801",secretKeep:"\u5DF2\u6709\u4FDD\u5B58\u7684\u51ED\u636E\uFF1B\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u3002\u4EC5\u70B9\u51FB\u300C\u6E05\u7A7A\u51ED\u636E\u300D\u624D\u4F1A\u79FB\u9664\u3002",secretClear:"\u6E05\u7A7A\u51ED\u636E",secretUndoClear:"\u64A4\u9500\u6E05\u7A7A",secretClearPending:"\u4FDD\u5B58\u65F6\u5C06\u6E05\u7A7A\u6B64\u51ED\u636E\uFF1B\u8F93\u5165\u65B0\u503C\u4F1A\u53D6\u6D88\u6E05\u7A7A\u3002",sshSection:"SSH \u96A7\u9053",sshEnable:"\u901A\u8FC7 SSH \u8FDE\u63A5",sshSingleHopHint:"\u4EC5\u652F\u6301\u5355\u8DF3\uFF1BSSH \u670D\u52A1\u5668\u4FE1\u606F\u4E0E\u56FA\u5B9A\u4E3B\u673A\u6307\u7EB9\u5747\u4E3A\u5FC5\u586B\u9879\u3002",sshHost:"SSH \u4E3B\u673A",sshPort:"SSH \u7AEF\u53E3",sshUsername:"SSH \u7528\u6237\u540D",sshAuthType:"SSH \u8BA4\u8BC1\u65B9\u5F0F",sshAuthPassword:"\u5BC6\u7801",sshAuthPrivateKey:"\u79C1\u94A5",sshHostFingerprint:"\u56FA\u5B9A SSH \u4E3B\u673A\u6307\u7EB9",sshFingerprintHint:"\u8BF7\u901A\u8FC7\u7BA1\u7406\u5458\u7684\u53EF\u4FE1\u6E20\u9053\u83B7\u53D6 SHA256:\u2026 \u4E3B\u673A\u6307\u7EB9\uFF1B\u4E0D\u4F1A\u81EA\u52A8\u63A2\u6D4B\u6216\u4FE1\u4EFB\u6307\u7EB9\u3002",sshPassword:"SSH \u5BC6\u7801",sshPrivateKey:"SSH \u79C1\u94A5",sshPrivateKeyHint:"\u7C98\u8D34\u5B8C\u6574\u79C1\u94A5\u3002\u5DF2\u4FDD\u5B58\u7684\u79C1\u94A5\u4E0D\u4F1A\u56DE\u8BFB\uFF0C\u4E5F\u4E0D\u4F1A\u8BFB\u53D6\u4E3B\u673A\u4E0A\u7684\u4EFB\u610F\u8DEF\u5F84\u6587\u4EF6\u3002",sshPassphrase:"\u79C1\u94A5\u53E3\u4EE4\uFF08\u53EF\u9009\uFF09",sshDatabaseHostHint:"\u6570\u636E\u5E93\u4E3B\u673A\u4EE5 SSH \u8DF3\u677F\u673A\u7684\u89C6\u89D2\u89E3\u6790\uFF1B127.0.0.1 \u6307\u8DF3\u677F\u673A\u672C\u673A\u3002",sshSecurityHint:"SSH \u4E0D\u4EE3\u66FF\u6570\u636E\u5E93 TLS\u3002\u9700\u8981\u65F6\u4ECD\u5E94\u542F\u7528\u6570\u636E\u5E93 TLS\uFF0C\u5E76\u4F7F\u7528\u6570\u636E\u5E93\u670D\u52A1\u5668\u540D\u6821\u9A8C\u8BC1\u4E66\u3002",sshDisableHint:"\u5173\u95ED SSH \u540E\u4FDD\u5B58\u4F1A\u79FB\u9664\u5DF2\u4FDD\u5B58\u7684\u96A7\u9053\u8BBE\u7F6E\u548C SSH \u51ED\u636E\u3002",sshFieldsRequired:"\u8BF7\u586B\u5199 SSH \u4E3B\u673A\u3001\u7528\u6237\u540D\u3001\u8BA4\u8BC1\u65B9\u5F0F\u53CA\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\u3002",sshPortInvalid:"SSH \u7AEF\u53E3\u5FC5\u987B\u662F 1 \u81F3 65535 \u7684\u6574\u6570\u3002",sshFingerprintInvalid:"\u8BF7\u8F93\u5165\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\uFF08SHA256: \u540E\u8DDF 43 \u4E2A base64 \u5B57\u7B26\uFF0C\u53EF\u5E26\u672B\u5C3E =\uFF09\u3002",tlsServerName:"TLS \u670D\u52A1\u5668\u540D",tlsServerNameHint:"\u7559\u7A7A\u9ED8\u8BA4\u4F7F\u7528\u6570\u636E\u5E93\u4E3B\u673A\u3002\u586B\u5199\u6570\u636E\u5E93\u8BC1\u4E66\u4E0A\u7684\u670D\u52A1\u5668\u540D\uFF0C\u800C\u4E0D\u662F SSH \u4E3B\u673A\u6216\u672C\u5730\u8F6C\u53D1\u5730\u5740\u3002",sqlserverVerifyCaUnsupported:"SQL Server \u4E0D\u652F\u6301\u4EC5\u6821\u9A8C\u8BC1\u4E66\u94FE\u800C\u4E0D\u6821\u9A8C\u4E3B\u673A\u540D\uFF1B\u8BF7\u9009\u62E9\u5B8C\u6574\u6821\u9A8C\u6216\u5176\u4ED6\u652F\u6301\u7684 TLS \u6A21\u5F0F\u3002",engine:"\u5F15\u64CE",host:"\u4E3B\u673A",port:"\u7AEF\u53E3",user:"\u7528\u6237\u540D",password:"\u5BC6\u7801",database:"\u6570\u636E\u5E93",schema:"Schema",file:"\u6570\u636E\u5E93\u6587\u4EF6",redisDb:"\u5E93\u5E8F\u53F7",color:"\u73AF\u5883\u8272",identity:"\u6807\u8BC6",group:"\u5206\u7EC4",sslDisable:"\u5173\u95ED TLS",sslRequire:"TLS\uFF0C\u4E0D\u6821\u9A8C\u8BC1\u4E66",sslVerifyCa:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u94FE",sslVerifyFull:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u4E0E\u4E3B\u673A\u540D",connectionLost:"\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u91CD\u8FDE\u5931\u8D25\u3002",bannerTools:"Agent \u53EF\u4EE5\u68C0\u67E5\u5E76\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\u3002",writesEnabled:"Agent \u53EF\u5199",writesDisabled:"Agent \u53EA\u8BFB",unsaved:"\u672A\u4FDD\u5B58",copyName:"\u590D\u5236\u540D\u79F0",openInQuery:"\u5728\u67E5\u8BE2\u4E2D\u6253\u5F00",tablesCount:"{n} \u5F20\u8868",viewsCount:"{n} \u4E2A\u89C6\u56FE",routinesCount:"{n} \u4E2A\u4F8B\u7A0B",server:"\u670D\u52A1\u5668",updatedAt:"\u66F4\u65B0\u65F6\u95F4",version:"\u7248\u672C",boundProject:"\u9879\u76EE",noGroups:"\u672A\u5206\u7EC4"},qt={en:Pn,zh:$n};var Ne=require("react");var pt=new Set("select from where group by order having limit offset join inner left right full outer cross on as and or not in is null like ilike between exists case when then else end union all distinct insert into values update set delete create table view index alter add drop truncate primary key foreign references unique default constraint cascade returning with recursive asc desc explain analyze show describe use begin commit rollback transaction if temporary materialized over partition window rows range current row unbounded preceding following fetch next only for share nowait".split(/\s+/)),ft=new Set("count sum avg min max coalesce nullif cast convert round floor ceil abs length lower upper trim ltrim rtrim substr substring replace concat concat_ws now current_timestamp current_date current_time date_trunc extract date_part to_char to_date row_number rank dense_rank ntile lag lead first_value last_value json_extract array_agg string_agg group_concat ifnull greatest least random uuid gen_random_uuid".split(/\s+/)),At=["SELECT","FROM","WHERE","GROUP BY","ORDER BY","HAVING","LIMIT","OFFSET","UNION ALL","UNION","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","RETURNING","LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN","JOIN"];function bt(t){let e=String(t??""),n=[],a=0,d=(o,f)=>{if(!f)return;let g=n[n.length-1];g&&g.type===o?g.value+=f:n.push({type:o,value:f})};for(;a<e.length;){let o=e[a],f=e.slice(a);if(o==="-"&&e[a+1]==="-"){let g=e.indexOf(`
`,a),m=g===-1?e.length:g;d("comment",e.slice(a,m)),a=m;continue}if(o==="/"&&e[a+1]==="*"){let g=e.indexOf("*/",a+2),m=g===-1?e.length:g+2;d("comment",e.slice(a,m)),a=m;continue}if(o==="'"||o==='"'||o==="`"){let g=a+1;for(;g<e.length;){if(e[g]==="\\"){g+=2;continue}if(e[g]===o){if(e[g+1]===o){g+=2;continue}g+=1;break}g+=1}d(o==="'"?"string":"ident",e.slice(a,g)),a=g;continue}if(o==="$"&&/^\$[A-Za-z_]*\$/.test(f)){let g=/^\$[A-Za-z_]*\$/.exec(f)[0],m=e.indexOf(g,a+g.length),b=m===-1?e.length:m+g.length;d("string",e.slice(a,b)),a=b;continue}if(/[0-9]/.test(o)||o==="."&&/[0-9]/.test(e[a+1]??"")){let g=/^[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/.exec(f);d("number",g?g[0]:o),a+=g?g[0].length:1;continue}if(/[A-Za-z_@:]/.test(o)){let m=/^[A-Za-z_@:][A-Za-z0-9_$@:]*/.exec(f)[0],b=m.toLowerCase(),y=e[a+m.length];o==="@"||o===":"?d("variable",m):pt.has(b)?d("keyword",m):y==="("||ft.has(b)?d("function",m):d("plain",m),a+=m.length;continue}if(/[(),;]/.test(o)){d("punct",o),a+=1;continue}if(/[=<>!+\-*/%|]/.test(o)){let g=/^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/.exec(f);d("operator",g?g[0]:o),a+=g?g[0].length:1;continue}d("ws",o),a+=1}return n}function Lt(t){let e=String(t??"").trim();if(!e)return"";let n=bt(e),a=[],d="",o=0,f=()=>{let g=d.trim();g&&a.push(g),d=""};for(let g=0;g<n.length;g+=1){let m=n[g];if(m.type==="ws"){d!==""&&!d.endsWith(" ")&&(d+=" ");continue}if(m.type==="comment"){f(),a.push(m.value.trim());continue}if(m.type==="punct"){m.value==="("&&(o+=1),m.value===")"&&(o=Math.max(0,o-1)),d+=m.value;continue}if(m.type==="keyword"){let b=m.value.toUpperCase(),y=n[g+1],A=n[g+2];if(y&&y.type==="ws"&&A&&A.type==="keyword"){let $=`${b} ${A.value.toUpperCase()}`;At.includes($)&&(b=$,g+=2)}if(o===0&&At.includes(b)){f(),d=`${b} `;continue}d+=`${b} `;continue}d+=m.value}return f(),a.length<2?e:a.join(`
  `).replace(/[ \t]+$/gm,"")}function Ke(t,e){let n=String(e??"");return t==="mysql"?"`"+n.replace(/`/g,"``")+"`":t==="sqlserver"?"["+n.replace(/]/g,"]]")+"]":'"'+n.replace(/"/g,'""')+'"'}function mt(t){let e=String(t??"").trim();return e===""?"''":/^-?\d+(\.\d+)?$/.test(e)?e:/^(null|true|false)$/i.test(e)?e.toUpperCase():`'${e.replace(/'/g,"''")}'`}var Ht=["=","<>",">",">=","<","<=","LIKE","NOT LIKE","IN","BETWEEN","IS NULL","IS NOT NULL"];function vt(t,e){let n=[];for(let a of e.conditions){if(!a.column)continue;let d=Ke(t,a.column),o=a.op;if(o==="IS NULL"||o==="IS NOT NULL"){n.push(`${d} ${o}`);continue}let f=String(a.value??"");if(f!==""){if(o==="IN"){let g=f.split(",").map(mt).filter(Boolean);if(g.length===0)continue;n.push(`${d} IN (${g.join(", ")})`);continue}if(o==="BETWEEN"){let g=f.split(",").map(mt);if(g.length<2)continue;n.push(`${d} BETWEEN ${g[0]} AND ${g[1]}`);continue}n.push(`${d} ${o} ${mt(f)}`)}}return n.join(` ${e.joiner} `)}function Bt(t,e){let n=document.createElement("div"),a=window.getComputedStyle(t),d=["fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","padding","border","whiteSpace","wordWrap","tabSize"];for(let m of d)n.style[m]=a[m];n.style.position="absolute",n.style.visibility="hidden",n.style.width=`${t.clientWidth}px`,n.style.whiteSpace="pre-wrap",n.style.overflowWrap="break-word",n.textContent=t.value.slice(0,e);let o=document.createElement("span");o.textContent="\u200B",n.appendChild(o),document.body.appendChild(n);let f=o.offsetLeft-t.scrollLeft,g=o.offsetTop-t.scrollTop;return document.body.removeChild(n),{left:Math.max(0,f),top:g}}function pe(t,e){return String(t).replace(/\{(\w+)\}/g,(n,a)=>e&&e[a]!==void 0?String(e[a]):n)}function _e(t,e,n=300){if(t==null)return{text:e,isNull:!0,numeric:!1};if(typeof t=="object")try{let d=JSON.stringify(t);return{text:d.length>n?`${d.slice(0,n)}\u2026`:d,isNull:!1,numeric:!1}}catch{return{text:String(t),isNull:!1,numeric:!1}}let a=String(t);return{text:a.length>n?`${a.slice(0,n)}\u2026`:a,isNull:!1,numeric:typeof t=="number"}}function Ge(t){if(t==null)return"";let e=typeof t=="object"?JSON.stringify(t):String(t);return/[",\n\r]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Kt(t){return String(t||"table").replace(/[^\w.-]+/g,"_").slice(0,60)}function Je(t,e,n){let a=new Blob([n],{type:`${e};charset=utf-8`}),d=URL.createObjectURL(a),o=document.createElement("a");o.href=d,o.download=t,document.body.appendChild(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(d),1e3)}function Dn(t,e){return t==null?"NULL":typeof t=="number"?Number.isFinite(t)?String(t):"NULL":typeof t=="boolean"?e==="sqlserver"?t?"1":"0":t?"TRUE":"FALSE":`'${(typeof t=="object"?JSON.stringify(t):String(t)).replace(/'/g,"''")}'`}function Ot(t,e,n,a){let o=[e.database,...t==="postgres"||t==="sqlserver"?[e.schema]:[],e.table].filter(Boolean).map(g=>Ke(t,g)).join("."),f=n.map(g=>Ke(t,g.name)).join(", ");return a.map(g=>`INSERT INTO ${o} (${f}) VALUES (${n.map(m=>Dn(g[m.name],t)).join(", ")});`).join(`
`)}function Ft(t,e){let n=f=>f==null?"":(typeof f=="object"?JSON.stringify(f):String(f)).replace(/\|/g,"\\|").replace(/\r?\n/g," "),a=`| ${t.map(f=>n(f.name)).join(" | ")} |`,d=`| ${t.map(()=>"---").join(" | ")} |`,o=e.map(f=>`| ${t.map(g=>n(f[g.name])).join(" | ")} |`);return[a,d,...o].join(`
`)}function jt(t){let e=String(t??"").replace(/^\uFEFF/,""),n=[],a=[],d=[],o="",f=!1,g=1,m=1,b=0,y=()=>{d.push(o),o=""},A=()=>{y(),(d.length>1||d[0]!=="")&&n.push(d),d=[]};for(;b<e.length;){let H=e[b];if(f){if(H==='"'){if(e[b+1]==='"'){o+='"',b+=2;continue}f=!1,b+=1;continue}(H===`
`||H==="\r")&&(m+=1),o+=H,b+=1;continue}if(H==='"'&&o===""){f=!0,g=m,b+=1;continue}if(H===","){y(),b+=1;continue}if(H==="\r"){b+=e[b+1]===`
`?2:1,m+=1,A();continue}if(H===`
`){b+=1,m+=1,A();continue}o+=H,b+=1}(o!==""||d.length>0)&&A(),f&&a.push(`the quoted field starting on line ${g} is not closed`);let[$=[],...k]=n,B=$.length;B===0&&a.push("the file has no header row");let R=new Set;return $.forEach((H,L)=>{let T=H.trim();T||a.push(`header field ${L+1} is empty`),R.has(T)&&a.push(`header "${T}" appears more than once`),R.add(T)}),k.forEach((H,L)=>{H.length>B&&a.push(`row ${L+2} has ${H.length} fields but the header has ${B}`)}),{header:$.map(H=>H.trim()),rows:k.map(H=>{let L=H.slice(0,B);for(;L.length<B;)L.push("");return L}),errors:a}}function Qt(t){if(!Number.isFinite(t)||t<=0)return"0 B";let e=["B","KB","MB","GB"],n=t,a=0;for(;n>=1024&&a<e.length-1;)n/=1024,a+=1;return`${n.toFixed(a===0?0:1)} ${e[a]}`}function Vt(t){let e=Date.parse(t);if(Number.isNaN(e))return"";let n=Math.max(1,Math.round((Date.now()-e)/1e3));return n<60?`${n}s`:n<3600?`${Math.round(n/60)}m`:n<86400?`${Math.round(n/3600)}h`:`${Math.round(n/86400)}d`}var Ut=require("react");var Ye=class extends Error{constructor(n,a){super(n);this.status=a;this.name="ApiError"}},qn="api/grid",ht=class{constructor(e=qn){this.path=e}async call(e,n={},a){let d;try{d=await fetch(this.path,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:e,...n}),...a?{signal:a}:{}})}catch(g){throw g instanceof DOMException&&g.name==="AbortError"?g:new Ye(g instanceof Error?g.message:String(g),0)}let o=null;try{o=await d.json()}catch{o=null}let f=o&&typeof o=="object"?o:{};if(!d.ok||f.error)throw new Ye(String(f.error??`request failed (${d.status})`),d.status);return f}meta(){return this.call("meta")}listConnections(){return this.call("connections.list")}createConnection(e){return this.call("connections.create",{connection:e})}updateConnection(e,n){return this.call("connections.update",{id:e,patch:n})}deleteConnection(e){return this.call("connections.delete",{id:e})}testConnection(e){return this.call("connections.test",{id:e})}testDraft(e,n){return this.call("connections.test",{connection:e,...n?{id:n}:{}})}connect(e){return this.call("connections.connect",{id:e})}disconnect(e){return this.call("connections.disconnect",{id:e})}sessions(){return this.call("connections.sessions")}databases(e){return this.call("databases",{connectionId:e})}relations(e,n,a){return this.call("tables",{connectionId:e,database:n,schema:a})}describe(e,n,a,d){return this.call("columns",{connectionId:e,database:n,schema:a,table:d})}rows(e,n){return this.call("rows",e,n)}updateRow(e){return this.call("rows.update",e)}insertRow(e){return this.call("rows.insert",e)}insertRows(e){return this.call("rows.insertMany",e)}deleteRow(e){return this.call("rows.delete",e)}exportRows(e){return this.call("export",e)}sql(e){return this.call("sql",e)}sqlCancel(e){return this.call("sql.cancel",{connectionId:e})}routines(e,n,a){return this.call("routines",{connectionId:e,database:n,schema:a})}accounts(e){return this.call("accounts",{connectionId:e})}listQueries(){return this.call("queries.list")}saveQuery(e){return this.call("queries.save",e)}deleteQuery(e){return this.call("queries.delete",{id:e})}bindProject(e){return this.call("projects.bind",e)}unbindProject(e){return this.call("projects.unbind",{workspaceId:e})}redisDatabases(e){return this.call("redis.databases",{connectionId:e})}redisScan(e){return this.call("redis.scan",e)}redisKey(e,n,a){return this.call("redis.key",{connectionId:e,key:n,database:a})}redisCommand(e,n){return this.call("redis.command",{connectionId:e,command:n})}redisDelete(e,n,a){return this.call("redis.delete",{connectionId:e,key:n,database:a})}engines(){return this.call("meta")}},J=new ht;var qe=class{constructor(e){this.listeners=new Set;this.getSnapshot=()=>this.state;this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)});this.state=e}setState(e){this.state=e;for(let n of this.listeners)n()}patch(e){this.setState({...this.state,...e})}};function ve(t){return(0,Ut.useSyncExternalStore)(t.subscribe,t.getSnapshot,t.getSnapshot)}var yt=class extends qe{constructor(){super({meta:null,error:""})}async load(){try{this.patch({meta:await J.meta(),error:""})}catch(e){this.patch({error:e instanceof Error?e.message:String(e)})}}get current(){return this.state.meta}engines(){return this.state.meta?.engines??[]}get allowWrites(){return this.state.meta?.allowWrites===!0}},Wt={status:"closed",version:"",error:"",databases:[]},xt=class extends qe{constructor(){super({items:[],activeId:"",loading:!1,error:"",sessions:{},testing:{}})}async load(){this.patch({loading:!0});try{let{connections:e}=await J.listConnections(),n=this.state.items.some(a=>a.id===this.state.activeId)?this.state.activeId:e[0]?.id??"";this.patch({items:e,activeId:n,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}select(e){this.patch({activeId:e})}get active(){return this.state.items.find(e=>e.id===this.state.activeId)??null}session(e){return this.state.sessions[e]??Wt}setSession(e,n){let a=this.session(e);this.patch({sessions:{...this.state.sessions,[e]:{...a,...n}}})}async create(e){let n=await J.createConnection(e);return await this.load(),this.select(n.connection.id),n.probe}async update(e,n){await J.updateConnection(e,n),this.setSession(e,{status:"closed",version:"",databases:[]}),await this.load()}async remove(e){await J.deleteConnection(e);let n={...this.state.sessions};delete n[e],this.patch({sessions:n}),await this.load()}async test(e){this.patch({testing:{...this.state.testing,[e]:!0}});try{return await J.testConnection(e)}finally{this.patch({testing:{...this.state.testing,[e]:!1}})}}async connect(e){if(this.session(e).status!=="open"){this.setSession(e,{status:"opening",error:""});try{let n=await J.connect(e),{databases:a}=await J.databases(e);this.setSession(e,{status:"open",version:n.serverVersion,databases:a,error:""})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}}async disconnect(e){await J.disconnect(e).catch(()=>{}),this.setSession(e,{...Wt})}async reloadDatabases(e){if(this.session(e).status!=="open")return this.connect(e);try{let{databases:n}=await J.databases(e);this.setSession(e,{databases:n})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}};function Jt(t,e,n=""){return`${t}|${e}|${n}`}var wt=class extends qe{constructor(){super({relations:{},routines:{},accounts:{},loading:{},errors:{}})}relationsOf(e){return this.state.relations[e]??[]}routinesOf(e){return this.state.routines[e]??[]}accountsOf(e){return this.state.accounts[e]??[]}isLoading(e){return this.state.loading[e]===!0}errorOf(e){return this.state.errors[e]??""}async run(e,n,a){this.patch({loading:{...this.state.loading,[e]:!0}});try{let d=await n();this.setState({...this.state,...a(d),loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:""}})}catch(d){this.setState({...this.state,loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:d instanceof Error?d.message:String(d)}})}}async loadRelations(e,n,a="",d=!1){let o=Jt(e,n,a);!d&&this.state.relations[o]||await this.run(o,()=>J.relations(e,n,a),({tables:f})=>({relations:{...this.state.relations,[o]:f}}))}async loadRoutines(e,n,a="",d=!1){let o=Jt(e,n,a);!d&&this.state.routines[o]||await this.run(o,()=>J.routines(e,n,a),({routines:f})=>({routines:{...this.state.routines,[o]:f}}))}async loadAccounts(e,n=!1){!n&&this.state.accounts[e]||await this.run(e,()=>J.accounts(e),({accounts:a})=>({accounts:{...this.state.accounts,[e]:a}}))}invalidate(e){let n={...this.state.relations};delete n[e],this.patch({relations:n})}},kt=class extends qe{constructor(){super({tabs:[],activeId:""})}open(e){let n=this.state.tabs.some(a=>a.id===e.id);this.setState({tabs:n?this.state.tabs:this.state.tabs.concat(e),activeId:e.id})}activate(e){this.patch({activeId:e})}close(e){let n=this.state.tabs.findIndex(o=>o.id===e),a=this.state.tabs.filter(o=>o.id!==e),d=a[Math.max(0,n-1)];this.setState({tabs:a,activeId:this.state.activeId===e?d?.id??"":this.state.activeId})}closeConnection(e){let n=this.state.tabs.filter(d=>d.connectionId!==e),a=n.some(d=>d.id===this.state.activeId);this.setState({tabs:n,activeId:a?this.state.activeId:n[n.length-1]?.id??""})}get active(){return this.state.tabs.find(e=>e.id===this.state.activeId)??null}},Nt=class extends qe{constructor(){super({items:[],loading:!1,error:""})}async load(){this.patch({loading:!0});try{let{queries:e}=await J.listQueries();this.patch({items:e,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}async save(e){let{query:n}=await J.saveQuery(e);return await this.load(),n}async remove(e){await J.deleteQuery(e),await this.load()}},Ze=class{constructor(){this.meta=new yt;this.connections=new xt;this.catalog=new wt;this.tabs=new kt;this.queries=new Nt}async bootstrap(){await Promise.all([this.meta.load(),this.connections.load(),this.queries.load()])}bindings(){return this.meta.current?.bindings??[]}bindingFor(e){return this.bindings().find(n=>n.workspaceId===e)??null}};var Ie=require("react"),St=require("react-dom"),E=require("react/jsx-runtime"),Xt={plus:"M12 5v14M5 12h14",refresh:"M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6",play:"M8 5v14l11-7z",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",pencil:"M4 20h4L20 8l-4-4L4 16z",chevron:"M9 6l6 6-6 6",chevronLeft:"M15 6l-6 6 6 6",database:"M12 3c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3zM5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6",table:"M4 5h16v14H4zM4 10h16M10 10v9",view:"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",key:"M14 4a6 6 0 1 0-5.2 8.9L4 18v2h3v-3h3v-3h2.2A6 6 0 0 0 14 4z",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",download:"M12 4v10M8 11l4 4 4-4M5 19h14",x:"M6 6l12 12M18 6L6 18",check:"M5 13l4 4L19 7",plug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3",unplug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-6 6M12 18v3M4 4l16 16",filter:"M4 5h16l-6 7v6l-4 2v-8z",folder:"M3 6h6l2 2h10v11H3z",copy:"M9 9h10v10H9zM5 15V5h10",alert:"M12 4l9 16H3zM12 10v4M12 17h.01",columns:"M4 5h16M4 12h16M4 19h16",wand:"M4 20l10-10M14 5l1.5 1.5M18 3l1 2 2 .5-2 1.5.5 2-2-1-2 1 .5-2-2-1.5 2-.5z",history:"M12 8v5l3 2M4 12a8 8 0 1 0 3-6.2M4 4v4h4",function:"M9 4c-2 0-3 1-3 3v10c0 2-1 3-3 3M6 11h7M15 14l5 6M20 14l-5 6",user:"M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",bookmark:"M6 4h12v17l-6-4-6 4z",archive:"M4 4h16v4H4zM5 8h14v12H5zM9 13h6",link:"M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",info:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 8h.01",shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"};function N({name:t,size:e=14}){return(0,E.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:"false",children:(0,E.jsx)("path",{d:Xt[t]??Xt.table})})}function K(t){let e=["dg-btn","ant-btn"];return t.className&&e.push(t.className),t.variant&&t.variant!=="default"?(e.push(`dg-btn-${t.variant}`),e.push(`ant-btn-${t.variant}`)):e.push("ant-btn-default"),t.size&&(e.push(`dg-btn-${t.size}`),e.push(`ant-btn-${t.size}`)),t.active&&e.push("dg-btn-active","ant-btn-active"),t.loading&&e.push("ant-btn-loading"),t.block&&e.push("ant-btn-block"),(0,E.jsxs)("button",{type:t.type??"button",className:e.join(" "),onClick:t.onClick,disabled:t.disabled||t.loading,title:t.title,"aria-label":t.title,"aria-pressed":t.active,style:t.style,children:[t.loading?(0,E.jsx)(xe,{}):t.icon?(0,E.jsx)(N,{name:t.icon,size:t.size==="sm"?11:13}):null,t.children]})}function ce(t){return(0,E.jsx)("button",{type:"button",className:`dg-iconbtn ant-btn ant-btn-icon-only${t.active?" dg-btn-active":""}${t.className?` ${t.className}`:""}`,title:t.title,"aria-label":t.title,onClick:t.onClick,disabled:t.disabled,children:(0,E.jsx)(N,{name:t.icon,size:t.size??13})})}function re(t){return(0,E.jsxs)("label",{className:`dg-field ant-form-item${t.wide?" dg-field-wide":""}${t.required?" dg-field-required ant-form-item-required":""}${t.className?` ${t.className}`:""}`,style:t.style,children:[(0,E.jsx)("span",{className:"dg-field-label ant-form-item-label",children:t.label}),t.children,t.hint?(0,E.jsx)("span",{className:"dg-field-hint ant-form-item-explain",children:t.hint}):null]})}function se(t){let{className:e,...n}=t;return(0,E.jsx)("input",{...n,className:`dg-input ant-input${e?` ${e}`:""}`})}function et(t){let{className:e,...n}=t;return(0,E.jsx)("textarea",{...n,className:`dg-input dg-textarea ant-input ant-input-textarea${e?` ${e}`:""}`})}function we(t){return(0,E.jsx)("select",{...t,className:`dg-input dg-select ant-select${t.className?` ${t.className}`:""}`})}function ze(t){let e=["dg-card","ant-card"];return t.hoverable&&e.push("dg-card-hoverable","ant-card-hoverable"),t.size==="small"&&e.push("dg-card-sm","ant-card-small"),t.bordered===!1&&e.push("ant-card-borderless"),t.className&&e.push(t.className),(0,E.jsxs)("div",{className:e.join(" "),style:t.style,onClick:t.onClick,children:[t.title||t.extra?(0,E.jsxs)("div",{className:"dg-card-head ant-card-head",children:[(0,E.jsx)("div",{className:"dg-card-head-title ant-card-head-title",children:t.title}),t.extra?(0,E.jsx)("div",{className:"dg-card-extra ant-card-extra",children:t.extra}):null]}):null,(0,E.jsx)("div",{className:"dg-card-body ant-card-body",children:t.children})]})}function _t(t){return(0,E.jsx)("div",{className:"dg-split",role:"separator","aria-orientation":"vertical",onMouseDown:n=>{n.preventDefault();let a=n.clientX,d=t.width;t.onDragging?.(!0);let o=g=>{t.setWidth(Math.max(t.min,Math.min(t.max,d+g.clientX-a)))},f=()=>{t.onDragging?.(!1),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",f)};window.addEventListener("mousemove",o),window.addEventListener("mouseup",f)}})}function Oe(t){let e=t.color&&t.color!=="default"?` dg-tag-${t.color} ant-tag-${t.color}`:"";return(0,E.jsxs)("span",{className:`dg-tag ant-tag${e}${t.bordered===!1?" ant-tag-borderless":""}${t.className?` ${t.className}`:""}`,style:t.style,onClick:t.onClick,children:[t.icon?(0,E.jsx)(N,{name:t.icon,size:11}):null,t.children]})}function Ct(t){return t.status||t.text?(0,E.jsxs)("span",{className:`dg-badge-status ant-badge ant-badge-status${t.className?` ${t.className}`:""}`,children:[(0,E.jsx)("span",{className:`dg-badge-status-dot ant-badge-status-dot dg-badge-status-${t.status??"default"} ant-badge-status-${t.status??"default"}`}),t.text?(0,E.jsx)("span",{className:"dg-badge-status-text ant-badge-status-text",children:t.text}):null,t.children]}):(0,E.jsxs)("span",{className:`dg-badge ant-badge${t.className?` ${t.className}`:""}`,children:[t.children,t.count!==void 0?(0,E.jsx)("sup",{className:"ant-badge-count",children:t.count}):null]})}function Gt({status:t}){return(0,E.jsx)("span",{className:`dg-dot${t==="open"?" dg-dot-open ant-badge-status-success":t==="error"?" dg-dot-error ant-badge-status-error":t==="opening"?" dg-dot-busy ant-badge-status-processing":" ant-badge-status-default"}`})}function Et(t){let e=t.type??"info",n=t.children??t.message;if(!n)return null;let a=e==="error"||e==="warning"?"alert":e==="success"?"check":"info";return(0,E.jsxs)("div",{className:`dg-banner ant-alert dg-banner-${e} ant-alert-${e}${t.description?" ant-alert-with-description":""}${t.className?` ${t.className}`:""}`,style:t.style,role:"alert",children:[t.showIcon!==!1?(0,E.jsx)("span",{className:"ant-alert-icon",children:(0,E.jsx)(N,{name:a,size:t.description?16:14})}):null,(0,E.jsxs)("div",{className:"ant-alert-content",children:[(0,E.jsx)("div",{className:"dg-banner-text ant-alert-message",children:n}),t.description?(0,E.jsx)("div",{className:"ant-alert-description",children:t.description}):null]}),t.closable||t.onClose?(0,E.jsx)("button",{type:"button",className:"dg-iconbtn dg-iconbtn-tiny ant-alert-close-icon",onClick:t.onClose,"aria-label":"close",children:(0,E.jsx)(N,{name:"x",size:10})}):null]})}function fe(t){return(0,E.jsx)(Et,{type:t.tone??"info",onClose:t.onClose,children:t.children})}function Yt(t){return(0,E.jsx)("div",{className:`dg-seg ant-segmented${t.size==="sm"?" ant-segmented-sm":""}`,children:(0,E.jsx)("div",{className:"ant-segmented-group",children:t.options.map(e=>(0,E.jsx)("button",{type:"button",className:`ant-segmented-item${e.value===t.value?" dg-seg-on ant-segmented-item-selected":""}`,onClick:()=>t.onChange(e.value),children:e.label},e.value))})})}function xe({label:t}){return(0,E.jsxs)("span",{className:"dg-spinner-row ant-spin ant-spin-spinning",children:[(0,E.jsx)("span",{className:"dg-spinner ant-spin-dot","aria-hidden":!0}),t?(0,E.jsx)("span",{className:"ant-spin-text",children:t}):null]})}function he({title:t,hint:e,children:n}){return(0,E.jsxs)("div",{className:"dg-empty ant-empty",children:[(0,E.jsx)("div",{className:"ant-empty-image",children:(0,E.jsx)(N,{name:"database",size:36})}),(0,E.jsx)("div",{className:"dg-empty-title ant-empty-description",children:t}),e?(0,E.jsx)("div",{className:"dg-empty-hint",children:e}):null,n?(0,E.jsx)("div",{className:"ant-empty-footer",children:n}):null]})}function Se(t){let e=(0,Ie.useRef)(null),n=(0,Ie.useRef)(t.onClose);n.current=t.onClose;let a=(0,Ie.useRef)(t.busy);return a.current=t.busy,(0,Ie.useEffect)(()=>{let d=f=>{f.key==="Escape"&&!a.current&&(f.stopPropagation(),n.current())};document.addEventListener("keydown",d);let o=setTimeout(()=>e.current?.focus(),0);return()=>{document.removeEventListener("keydown",d),clearTimeout(o)}},[]),(0,St.createPortal)((0,E.jsx)("div",{className:"dg-backdrop ant-modal-root",onMouseDown:d=>{d.target===d.currentTarget&&!t.busy&&t.onClose()},children:(0,E.jsxs)("div",{className:"dg-modal ant-modal",style:{width:`${t.width??560}px`},role:"dialog","aria-modal":"true","aria-label":t.title,children:[(0,E.jsxs)("div",{className:"dg-modal-head ant-modal-header",children:[(0,E.jsxs)("div",{className:"dg-modal-title-wrap ant-modal-title",children:[t.icon?(0,E.jsx)("span",{className:"dg-modal-icon-badge",children:(0,E.jsx)(N,{name:t.icon,size:15})}):null,(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"dg-modal-title",children:t.title}),t.subtitle?(0,E.jsx)("div",{className:"dg-modal-subtitle",children:t.subtitle}):null]})]}),(0,E.jsx)("button",{ref:e,type:"button",className:"dg-iconbtn ant-modal-close",onClick:()=>!t.busy&&t.onClose(),"aria-label":"close",children:(0,E.jsx)(N,{name:"x",size:13})})]}),(0,E.jsx)("div",{className:"dg-modal-body ant-modal-body",children:t.children}),t.footer?(0,E.jsx)("div",{className:"dg-modal-foot ant-modal-footer",children:t.footer}):null]})}),document.body)}function Fe(t){let e=(0,Ie.useRef)(null);(0,Ie.useEffect)(()=>{let a=o=>{e.current&&!e.current.contains(o.target)&&t.onClose()},d=o=>{o.key==="Escape"&&t.onClose()};return document.addEventListener("mousedown",a),document.addEventListener("keydown",d),()=>{document.removeEventListener("mousedown",a),document.removeEventListener("keydown",d)}},[t.onClose]);let n=t.items.filter(Boolean);return(0,St.createPortal)((0,E.jsx)("div",{ref:e,className:"dg-ctxmenu ant-dropdown-menu",role:"menu",style:{left:`${Math.min(t.x,window.innerWidth-200)}px`,top:`${Math.min(t.y,Math.max(8,window.innerHeight-40-n.length*28))}px`},children:n.map((a,d)=>a.separator?(0,E.jsx)("div",{className:"dg-ctxsep ant-dropdown-menu-item-divider"},`sep-${d}`):(0,E.jsxs)("button",{type:"button",role:"menuitem",className:`dg-ctxitem ant-dropdown-menu-item${a.danger?" dg-ctxitem-danger ant-dropdown-menu-item-danger":""}`,disabled:a.disabled,onClick:()=>{t.onClose(),a.disabled||a.onClick?.()},children:[a.icon?(0,E.jsx)(N,{name:a.icon,size:12}):null,a.label,a.hint?(0,E.jsx)("span",{className:"dg-ctxhint",children:a.hint}):null]},`${a.label}-${d}`))}),document.body)}var Zt=`/* Grid panel styles.
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.dg-grid-host-port {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 1.2fr);
  gap: 16px;
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
  height: 28px; padding: 0 8px; border-radius: var(--dg-r-xs);
  cursor: pointer; font-size: 12px; color: var(--dg-text);
  transition: all 0.15s;
  user-select: none;
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
.dg-engines { display: grid; grid-template-columns: repeat(auto-fit, minmax(105px, 1fr)); gap: 8px; }
.dg-engine {
  display: flex; flex-direction: column; gap: 4px; align-items: flex-start;
  padding: 8px 12px;
  border: 1px solid var(--dg-line-soft); border-radius: var(--dg-r-md);
  background: var(--dg-surface); cursor: pointer;
  font-size: 13px; color: var(--dg-text); text-align: left;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dg-engine:hover:not(:disabled) {
  border-color: var(--ant-primary-hover, #4096ff);
  background: var(--dg-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.dg-engine-active {
  border-color: var(--ant-primary, #1677ff) !important;
  background: var(--ant-primary-bg, #e6f4ff) !important;
  box-shadow: 0 0 0 1px var(--ant-primary, #1677ff);
}
.dg-engine:disabled { opacity: 0.45; cursor: not-allowed; }
.dg-engine-head { display: flex; align-items: center; gap: 8px; }
.dg-engine-name { font-weight: 600; font-size: 13px; }
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
`;var Ce=require("react");var u=require("react/jsx-runtime"),Ln={mysql:{color:"#e48e00",glyph:"cylinder"},postgres:{color:"#336791",glyph:"cylinder"},sqlite:{color:"#0f80cc",glyph:"file"},sqlserver:{color:"#cc2927",glyph:"cylinder"},redis:{color:"#dc382d",glyph:"layers"}},Hn={mysql:["TCP",":3306","mysql2"],postgres:["TCP",":5432","pg"],sqlite:["file","built-in"],sqlserver:["TDS",":1433","mssql"],redis:["TCP",":6379","ioredis"]},Bn=[{value:"none",color:"var(--dsw-alias-border-l2)"},{value:"green",color:"var(--dsw-alias-state-success-primary)"},{value:"yellow",color:"var(--dsw-alias-state-warn-primary)"},{value:"red",color:"var(--dsw-alias-state-error-primary)"}];function Kn({engine:t,size:e=26}){let n=Ln[t]??{color:"#6b7280",glyph:"cylinder"},a=n.glyph==="layers"?"M12 4l7 3.5-7 3.5-7-3.5zM5 12l7 3.5 7-3.5M5 16.5l7 3.5 7-3.5":n.glyph==="file"?"M7 3h7l4 4v14H7zM10 12h5M10 16h5":"M12 4c3.9 0 6 1.1 6 2.5S15.9 9 12 9 6 7.9 6 6.5 8.1 4 12 4zM6 6.5v11c0 1.4 2.1 2.5 6 2.5s6-1.1 6-2.5v-11";return(0,u.jsx)("span",{className:"dg-logo",style:{width:e,height:e,background:n.color},"aria-hidden":!0,children:(0,u.jsx)("svg",{width:e*.68,height:e*.68,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",children:(0,u.jsx)("path",{d:a})})})}function tt(t){let{t:e,draft:n}=t;return(0,u.jsxs)("div",{className:"dg-field",children:[(0,u.jsx)(re,{label:t.label,hint:n.clear?e("secretClearPending"):t.hasSaved?e("secretKeep"):void 0,children:t.multiline?(0,u.jsx)(et,{"aria-label":t.label,value:n.value,onChange:a=>t.onChange(a.target.value),rows:5,autoComplete:"off",spellCheck:!1,disabled:t.disabled}):(0,u.jsx)(se,{"aria-label":t.label,type:"password",value:n.value,onChange:a=>t.onChange(a.target.value),autoComplete:"new-password",disabled:t.disabled})}),(0,u.jsx)("div",{children:(0,u.jsx)(K,{size:"sm",variant:"ghost",disabled:t.disabled,onClick:()=>t.onClear(!n.clear),children:n.clear?e("secretUndoClear"):e("secretClear")})})]})}function en(t){let{t:e,engines:n}=t,a=t.initial,[d,o]=(0,Ce.useState)(a?.engine??"sqlite"),[f,g]=(0,Ce.useState)("general"),[m,b]=(0,Ce.useState)(()=>({name:a?.name??"",group:a?.group??"",host:a?.host||"127.0.0.1",port:a?.port?String(a.port):"",user:a?.user??"",database:a?.database??"",file:a?.file??"",redisDb:String(a?.redisDb??0),sslMode:a?.sslMode??"disable",tlsServerName:a?.tlsServerName??"",color:a?.color??"none"})),[y,A]=(0,Ce.useState)(()=>({enabled:a?.ssh?.enabled===!0,host:a?.ssh?.host??"",port:String(a?.ssh?.port??22),username:a?.ssh?.username??"",authType:a?.ssh?.authType??"password",hostFingerprint:a?.ssh?.hostFingerprint??""})),[$,k]=(0,Ce.useState)(()=>({password:{value:"",clear:!1},sshPassword:{value:"",clear:!1},privateKey:{value:"",clear:!1},passphrase:{value:"",clear:!1}})),[B,R]=(0,Ce.useState)(null),[H,L]=(0,Ce.useState)(!1),[T,j]=(0,Ce.useState)(!1),[Y,Q]=(0,Ce.useState)(""),ee=n.find(x=>x.id===d),O=d!=="sqlite"&&ee?.kind!=="file",X=H||T,te=x=>s=>b(i=>({...i,[x]:s.target.value})),M=x=>s=>A(i=>({...i,[x]:s.target.value})),I=(x,s)=>k(i=>({...i,[x]:{value:s,clear:!1}})),G=(x,s)=>k(i=>({...i,[x]:{value:"",clear:s}})),z=(x,s)=>({t:e,draft:$[x],hasSaved:s,disabled:X,onChange:i=>I(x,i),onClear:i=>G(x,i)}),Z=x=>{A(s=>({...s,authType:x})),k(s=>x==="password"?{...s,privateKey:{value:"",clear:!0},passphrase:{value:"",clear:!0}}:{...s,sshPassword:{value:"",clear:!0}})},U=()=>{let x="";return O&&d==="sqlserver"&&m.sslMode==="verify-ca"?(x=e("sqlserverVerifyCaUnsupported"),g("ssl")):O&&y.enabled&&(!y.host.trim()||!y.username.trim()||!["password","privateKey"].includes(y.authType)?(x=e("sshFieldsRequired"),g("ssh")):!/^\d+$/.test(y.port)||Number(y.port)<1||Number(y.port)>65535?(x=e("sshPortInvalid"),g("ssh")):/^SHA256:[A-Za-z0-9+/]{43}=?$/.test(y.hostFingerprint.trim())||(x=e("sshFingerprintInvalid"),g("ssh"))),Q(x),x&&R(null),!x},oe=()=>{let x={name:m.name.trim(),engine:d,group:m.group.trim(),host:m.host.trim(),port:Number.parseInt(m.port,10)||ee?.defaultPort||0,user:m.user.trim(),database:m.database.trim(),file:m.file.trim(),redisDb:Number.parseInt(m.redisDb,10)||0,sslMode:m.sslMode,color:m.color};if(O)if(x.tlsServerName=m.tlsServerName.trim(),($.password.value!==""||$.password.clear)&&(x.password=$.password.value),y.enabled){let s={enabled:!0,host:y.host.trim(),port:Number(y.port),username:y.username.trim(),authType:y.authType,hostFingerprint:y.hostFingerprint.trim()};y.authType==="password"?(($.sshPassword.value!==""||$.sshPassword.clear)&&(s.password=$.sshPassword.value),$.privateKey.clear&&(s.privateKey=""),$.passphrase.clear&&(s.passphrase="")):(($.privateKey.value!==""||$.privateKey.clear)&&(s.privateKey=$.privateKey.value),($.passphrase.value!==""||$.passphrase.clear)&&(s.passphrase=$.passphrase.value),$.sshPassword.clear&&(s.password="")),x.ssh=s}else x.ssh={enabled:!1};else x.ssh={enabled:!1};return x},me=async()=>{if(U()){L(!0),R(null),Q("");try{let x=await J.testDraft(oe(),a?.id);R({ok:!0,text:pe(e("testOk"),{version:x.serverVersion??"",ms:x.latencyMs??0})})}catch(x){R({ok:!1,text:pe(e("testFailed"),{error:x instanceof Error?x.message:String(x)})})}finally{L(!1)}}},ye=async()=>{if(U()){j(!0),Q("");try{await t.onSave(oe())}catch(x){Q(x instanceof Error?x.message:String(x)),j(!1)}}},le=ee?.kind==="file"?m.file.trim():`${m.host||"\u2026"}:${m.port||ee?.defaultPort||"\u2026"}`;return(0,u.jsxs)(Se,{icon:"database",title:e(a?"edit":"newConnection"),onClose:t.onClose,busy:X,width:620,footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("span",{className:"dg-muted dg-hint",style:{marginRight:"auto",maxWidth:"54%"},children:B?.text??""}),(0,u.jsxs)(K,{onClick:()=>{me()},disabled:X,children:[H?(0,u.jsx)(xe,{}):null,e("test")]}),(0,u.jsx)(K,{onClick:t.onClose,disabled:X,children:e("cancel")}),(0,u.jsxs)(K,{variant:"primary",onClick:()=>{ye()},disabled:X,children:[T?(0,u.jsx)(xe,{}):null,e("save")]})]}),children:[(0,u.jsx)("div",{className:"dg-engines",children:n.map(x=>(0,u.jsxs)("button",{type:"button",className:`dg-engine${x.id===d?" dg-engine-active":""}`,onClick:()=>{x.id!==d&&(o(x.id),b(s=>({...s,port:String(x.defaultPort||""),sslMode:"disable"})),R(null),x.kind==="file"&&g("general"))},children:[(0,u.jsxs)("span",{className:"dg-engine-head",children:[(0,u.jsx)(Kn,{engine:x.id,size:22}),(0,u.jsx)("span",{className:"dg-engine-name",children:x.label})]}),(0,u.jsx)("span",{className:"dg-tags",children:(Hn[x.id]??[]).map(s=>(0,u.jsx)("span",{className:"dg-tag",children:s},s))})]},x.id))}),(0,u.jsxs)("div",{className:"dg-tags dg-summary",children:[(0,u.jsx)("span",{className:"dg-tag dg-tag-strong",children:ee?.label??d}),le?(0,u.jsx)("span",{className:"dg-tag",children:le}):null,m.database?(0,u.jsx)("span",{className:"dg-tag",children:m.database}):null,m.group?(0,u.jsx)("span",{className:"dg-tag",children:m.group}):null,O&&m.sslMode!=="disable"?(0,u.jsx)("span",{className:"dg-tag",children:"TLS"}):null,O&&y.enabled?(0,u.jsx)("span",{className:"dg-tag",children:"SSH"}):null]}),O?(0,u.jsxs)("div",{className:"dg-dialog-tabs",role:"tablist",children:[(0,u.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-general","aria-selected":f==="general","aria-controls":"tab-pane-general",className:`dg-dialog-tab${f==="general"?" dg-dialog-tab-active":""}`,onClick:()=>g("general"),children:[(0,u.jsx)(N,{name:"database",size:13}),(0,u.jsx)("span",{children:e("tabGeneral")})]}),(0,u.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-ssh","aria-selected":f==="ssh","aria-controls":"tab-pane-ssh",className:`dg-dialog-tab${f==="ssh"?" dg-dialog-tab-active":""}`,onClick:()=>g("ssh"),children:[(0,u.jsx)(N,{name:"link",size:13}),(0,u.jsx)("span",{children:e("sshSection")}),y.enabled?(0,u.jsx)("span",{className:"dg-tab-dot-badge dg-tab-dot-active"}):null]}),(0,u.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-ssl","aria-selected":f==="ssl","aria-controls":"tab-pane-ssl",className:`dg-dialog-tab${f==="ssl"?" dg-dialog-tab-active":""}`,onClick:()=>g("ssl"),children:[(0,u.jsx)(N,{name:"shield",size:13}),(0,u.jsx)("span",{children:e("tabSsl")}),m.sslMode!=="disable"?(0,u.jsx)("span",{className:"dg-tab-dot-badge dg-tab-dot-active"}):null]})]}):null,(0,u.jsxs)("div",{className:"dg-dialog-tab-body",children:[(0,u.jsxs)("div",{role:"tabpanel",id:"tab-pane-general","aria-labelledby":"tab-btn-general",className:"dg-tab-panel",style:{display:f==="general"?"flex":"none"},children:[(0,u.jsxs)("section",{className:"dg-form-section",style:O?{borderTop:0,paddingTop:0}:void 0,children:[(0,u.jsx)("div",{className:"dg-section-title",children:e("identity")}),(0,u.jsxs)("div",{className:"dg-form",children:[(0,u.jsx)(re,{label:e("name"),children:(0,u.jsx)(se,{value:m.name,onChange:te("name"),placeholder:ee?.label})}),(0,u.jsx)(re,{label:e("group"),children:(0,u.jsx)(se,{value:m.group,onChange:te("group"),placeholder:"dev"})})]}),(0,u.jsxs)("div",{className:"dg-colors",children:[(0,u.jsx)("span",{className:"dg-field-label",children:e("color")}),Bn.map(x=>(0,u.jsx)("button",{type:"button",className:`dg-swatch${x.value==="none"?" dg-swatch-none":""}${m.color===x.value?" dg-swatch-on":""}`,style:{background:x.color},title:x.value,"aria-label":x.value,"aria-pressed":m.color===x.value,onClick:()=>b(s=>({...s,color:x.value})),children:m.color===x.value?(0,u.jsx)(N,{name:"check",size:10}):null},x.value))]})]}),(0,u.jsxs)("section",{className:"dg-form-section",children:[ee?.kind==="file"?null:(0,u.jsx)("div",{className:"dg-section-title",children:e("server")}),ee?.kind==="file"?(0,u.jsx)("div",{className:"dg-form",children:(0,u.jsx)(re,{label:e("file"),wide:!0,hint:"e.g. D:\\\\data\\\\app.db",children:(0,u.jsx)(se,{value:m.file,onChange:te("file"),placeholder:"C:/data/app.db"})})}):(0,u.jsxs)("div",{className:"dg-form",children:[(0,u.jsxs)("div",{className:"dg-field-row dg-field-wide dg-grid-host-port",children:[(0,u.jsx)(re,{label:e("host"),hint:y.enabled?e("sshDatabaseHostHint"):void 0,children:(0,u.jsx)(se,{value:m.host,onChange:te("host")})}),(0,u.jsx)(re,{label:e("port"),children:(0,u.jsx)(se,{value:m.port,onChange:te("port"),placeholder:String(ee?.defaultPort??"")})})]}),(0,u.jsx)(re,{label:e("user"),children:(0,u.jsx)(se,{value:m.user,onChange:te("user")})}),(0,u.jsx)(tt,{label:e("password"),...z("password",a?.hasPassword??!1)}),d==="redis"?(0,u.jsx)(re,{label:e("redisDb"),children:(0,u.jsx)(se,{value:m.redisDb,onChange:te("redisDb"),inputMode:"numeric"})}):(0,u.jsx)(re,{label:e("database"),children:(0,u.jsx)(se,{value:m.database,onChange:te("database"),placeholder:"optional"})})]})]})]}),O?(0,u.jsx)("div",{role:"tabpanel",id:"tab-pane-ssh","aria-labelledby":"tab-btn-ssh",className:"dg-tab-panel",style:{display:f==="ssh"?"flex":"none"},children:(0,u.jsxs)("section",{className:"dg-form-section",style:{borderTop:0,paddingTop:0},children:[(0,u.jsx)("div",{className:"dg-section-title",children:e("sshSection")}),(0,u.jsxs)("label",{className:"dg-field-label dg-checkbox-row",children:[(0,u.jsx)("input",{type:"checkbox",checked:y.enabled,disabled:X,onChange:x=>{A(s=>({...s,enabled:x.target.checked})),R(null)}}),(0,u.jsx)("span",{style:{fontWeight:600},children:e("sshEnable")}),(0,u.jsx)("span",{className:`dg-tag${y.enabled?" dg-tag-strong":""}`,children:y.enabled?"Active":"Off"})]}),y.enabled?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"dg-field-hint",children:e("sshSingleHopHint")}),(0,u.jsxs)("div",{className:"dg-form",children:[(0,u.jsxs)("div",{className:"dg-field-row dg-field-wide dg-grid-host-port",children:[(0,u.jsx)(re,{label:e("sshHost"),children:(0,u.jsx)(se,{value:y.host,onChange:M("host"),required:!0,disabled:X,autoComplete:"off"})}),(0,u.jsx)(re,{label:e("sshPort"),children:(0,u.jsx)(se,{value:y.port,onChange:M("port"),required:!0,inputMode:"numeric",disabled:X})})]}),(0,u.jsx)(re,{label:e("sshUsername"),children:(0,u.jsx)(se,{value:y.username,onChange:M("username"),required:!0,disabled:X,autoComplete:"off"})}),(0,u.jsx)(re,{label:e("sshAuthType"),children:(0,u.jsxs)(we,{value:y.authType,disabled:X,required:!0,onChange:x=>Z(x.target.value),children:[(0,u.jsx)("option",{value:"password",children:e("sshAuthPassword")}),(0,u.jsx)("option",{value:"privateKey",children:e("sshAuthPrivateKey")})]})}),(0,u.jsx)(re,{label:e("sshHostFingerprint"),wide:!0,hint:e("sshFingerprintHint"),children:(0,u.jsx)(se,{value:y.hostFingerprint,onChange:M("hostFingerprint"),placeholder:"SHA256:\u2026",required:!0,disabled:X,autoComplete:"off",spellCheck:!1})}),y.authType==="password"?(0,u.jsx)(tt,{label:e("sshPassword"),...z("sshPassword",a?.ssh?.hasPassword??!1)}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"dg-field-wide",children:[(0,u.jsx)(tt,{label:e("sshPrivateKey"),multiline:!0,...z("privateKey",a?.ssh?.hasPrivateKey??!1)}),(0,u.jsx)("div",{className:"dg-field-hint",children:e("sshPrivateKeyHint")})]}),(0,u.jsx)(tt,{label:e("sshPassphrase"),...z("passphrase",a?.ssh?.hasPassphrase??!1)})]})]}),(0,u.jsx)(fe,{children:e("sshSecurityHint")})]}):a?.ssh?(0,u.jsx)("div",{className:"dg-field-hint",children:e("sshDisableHint")}):(0,u.jsxs)("div",{className:"dg-tab-placeholder",children:[(0,u.jsx)(N,{name:"link",size:16}),(0,u.jsx)("span",{children:e("sshSingleHopHint")})]})]})}):null,O?(0,u.jsx)("div",{role:"tabpanel",id:"tab-pane-ssl","aria-labelledby":"tab-btn-ssl",className:"dg-tab-panel",style:{display:f==="ssl"?"flex":"none"},children:(0,u.jsxs)("section",{className:"dg-form-section",style:{borderTop:0,paddingTop:0},children:[(0,u.jsx)("div",{className:"dg-section-title",children:"TLS / SSL"}),(0,u.jsxs)("div",{className:"dg-form",children:[(0,u.jsx)(re,{label:"TLS / SSL",wide:!0,hint:d==="sqlserver"?e("sqlserverVerifyCaUnsupported"):void 0,children:(0,u.jsxs)(we,{value:m.sslMode,onChange:x=>b(s=>({...s,sslMode:x.target.value})),children:[(0,u.jsx)("option",{value:"disable",children:e("sslDisable")}),(0,u.jsx)("option",{value:"require",children:e("sslRequire")}),(0,u.jsx)("option",{value:"verify-ca",disabled:d==="sqlserver",children:e("sslVerifyCa")}),(0,u.jsx)("option",{value:"verify-full",children:e("sslVerifyFull")})]})}),m.sslMode!=="disable"?(0,u.jsx)(re,{label:e("tlsServerName"),wide:!0,hint:e("tlsServerNameHint"),children:(0,u.jsx)(se,{value:m.tlsServerName,onChange:te("tlsServerName"),placeholder:m.host.trim()})}):null]})]})}):null]}),Y?(0,u.jsx)(fe,{tone:"error",onClose:()=>Q(""),children:Y}):null]})}var nt=require("react");var _=require("react/jsx-runtime");function tn(t){let{t:e,store:n}=t,a=ve(n.meta),d=ve(n.connections),[o,f]=(0,nt.useState)({}),[g,m]=(0,nt.useState)(""),[b,y]=(0,nt.useState)(""),A=a.meta?.workspaces??[],$=a.meta?.bindings??[],k=T=>$.find(j=>j.workspaceId===T),B=T=>{let j=k(T);return o[T]??{connectionId:j?.connectionId??"",database:j?.database??""}},R=(T,j)=>f(Y=>({...Y,[T]:{...B(T),...j}})),H=async(T,j)=>{let Y=B(T);if(!Y.connectionId)return y(e("selectConnection"));m(T),y("");try{await J.bindProject({workspaceId:T,workspacePath:j,connectionId:Y.connectionId,database:Y.database}),await n.meta.load();let ee=d.items.find(M=>M.id===Y.connectionId)?.name||Y.connectionId,O=Y.database?` (${Y.database})`:"",te=e("projectBound").replace("{name}",ee).replace("\uFF08{database}\uFF09",O).replace("({database})",O).replace("{database}",Y.database||"");t.notify(te,"success")}catch(Q){y(Q instanceof Error?Q.message:String(Q))}finally{m("")}},L=async T=>{m(T);try{await J.unbindProject(T),await n.meta.load(),t.notify(e("unbindProject")+" \u2713","info")}catch(j){y(j instanceof Error?j.message:String(j))}finally{m("")}};return(0,_.jsxs)(Se,{icon:"link",title:e("workspaces"),subtitle:e("agentHint"),onClose:t.onClose,width:680,footer:(0,_.jsx)(K,{onClick:t.onClose,children:e("close")}),children:[b?(0,_.jsx)(Et,{type:"error",message:b,closable:!0,onClose:()=>y(""),style:{marginBottom:12}}):null,A.length===0?(0,_.jsx)(he,{title:e("noWorkspaces")}):(0,_.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:12,maxHeight:"60vh",overflow:"auto",padding:"2px 0"},children:A.map(T=>{let j=k(T.id),Y=B(T.id),Q=d.items.find(O=>O.id===Y.connectionId),ee=Y.connectionId?n.connections.session(Y.connectionId).databases:[];return(0,_.jsxs)(ze,{size:"small",hoverable:!0,className:"dg-ws-card",children:[(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:10},children:[(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,minWidth:0,flex:1},children:[(0,_.jsx)("span",{className:"dg-ws-icon",children:(0,_.jsx)(N,{name:"folder",size:15})}),(0,_.jsxs)("div",{style:{minWidth:0,flex:1},children:[(0,_.jsx)("div",{style:{fontWeight:600,fontSize:13,color:"var(--dg-text)"},children:T.title}),(0,_.jsx)("div",{style:{fontSize:12,color:"var(--dg-text-2)",fontFamily:"var(--dg-mono)",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",marginTop:2},title:T.path,children:T.path})]})]}),j?(0,_.jsx)(Ct,{status:"success",text:(0,_.jsx)("span",{style:{fontWeight:500,color:"var(--ant-success, #52c41a)"},children:e("boundProject")})}):(0,_.jsx)(Ct,{status:"default",text:(0,_.jsx)("span",{style:{color:"var(--dg-text-3)"},children:e("projectUnbound")})})]}),j?(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:12},children:[(0,_.jsx)(Oe,{color:"blue",icon:"database",children:j.connectionName||j.connectionId}),j.database?(0,_.jsx)(Oe,{color:"cyan",children:j.database}):null,(0,_.jsx)(Oe,{color:"purple",children:e("readOnlyForAgent")})]}):null,(0,_.jsxs)("div",{className:"dg-ws-form",children:[(0,_.jsx)(re,{label:e("connections"),children:(0,_.jsxs)(we,{value:Y.connectionId,onChange:O=>{let X=O.target.value,te=d.items.find(M=>M.id===X);R(T.id,{connectionId:X,database:te?.database||""})},children:[(0,_.jsx)("option",{value:"",children:"\u2014"}),d.items.map(O=>(0,_.jsxs)("option",{value:O.id,children:[O.name," \xB7 ",O.engine]},O.id))]})}),(0,_.jsx)(re,{label:e("database"),children:ee.length>0?(0,_.jsxs)(we,{value:Y.database,onChange:O=>R(T.id,{database:O.target.value}),children:[(0,_.jsx)("option",{value:"",children:Q?.database?`${Q.database} (default)`:"\u2014"}),ee.map(O=>(0,_.jsx)("option",{value:O.name,children:O.name},O.name))]}):(0,_.jsx)(se,{value:Y.database,placeholder:Q?.database||"optional",onChange:O=>R(T.id,{database:O.target.value})})}),(0,_.jsxs)("div",{className:"dg-ws-actions",children:[(0,_.jsxs)(K,{size:"sm",variant:"primary",disabled:g===T.id||!Y.connectionId,loading:g===T.id,onClick:()=>{H(T.id,T.path)},children:[(0,_.jsx)(N,{name:"link",size:11}),e("bindProject")]}),j?(0,_.jsx)(K,{size:"sm",variant:"danger",disabled:g===T.id,onClick:()=>{L(T.id)},children:e("unbindProject")}):null]})]})]},T.id)})})]})}var ke=require("react");var r=require("react/jsx-runtime");function nn(t){let{t:e,store:n}=t,a=ve(n.catalog),d=`${t.connectionId}|${t.database}|${t.schema}`,[o,f]=(0,ke.useState)(""),[g,m]=(0,ke.useState)({column:"name",dir:"asc"});(0,ke.useEffect)(()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let b=(0,ke.useMemo)(()=>{let k=o.trim().toLowerCase();return(a.relations[d]??[]).filter(R=>R.kind===t.kind).filter(R=>k?R.name.toLowerCase().includes(k):!0).sort((R,H)=>{let L=g.dir==="desc"?-1:1;return g.column==="rows"?((R.rows??0)-(H.rows??0))*L:g.column==="comment"?(R.comment||"").localeCompare(H.comment||"")*L:R.name.localeCompare(H.name)*L})},[a.relations,d,o,t.kind,g]),y=a.loading[d]===!0,A=a.errors[d]??"",$=(k,B,R)=>(0,r.jsxs)("th",{className:R,onClick:()=>m(H=>H.column===k?{column:k,dir:H.dir==="asc"?"desc":"asc"}:{column:k,dir:"asc"}),children:[B,g.column===k?(0,r.jsx)("span",{className:"dg-sortmark",children:g.dir==="desc"?"\u25BC":"\u25B2"}):null]});return(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(N,{name:t.kind==="view"?"view":"table",size:12}),(0,r.jsx)("span",{children:t.kind==="view"?e("views"):e("tables")}),(0,r.jsx)("span",{className:"dg-chip",children:b.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(se,{value:o,placeholder:e("search"),style:{width:180},onChange:k=>f(k.target.value)}),t.onNewQuery?(0,r.jsxs)(K,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,r.jsx)(N,{name:"play",size:10}),e("newQuery")]}):null,(0,r.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema,!0)}})]}),A?(0,r.jsx)(fe,{tone:"error",children:A}):null,(0,r.jsx)("div",{className:"dg-grid-wrap",children:y?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(xe,{label:e("loading")})}):b.length===0?(0,r.jsx)(he,{title:e("emptyTables")}):(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[$("name",e("name")),$("rows",e("rows"),"dg-num"),$("comment",e("comment")),(0,r.jsx)("th",{style:{width:70}})]})}),(0,r.jsx)("tbody",{children:b.map(k=>(0,r.jsxs)("tr",{onDoubleClick:()=>t.onOpen(k),children:[(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-list-name",children:[(0,r.jsx)(N,{name:k.kind==="view"?"view":"table",size:11}),(0,r.jsx)("span",{className:"dg-mono",children:k.name})]})}),(0,r.jsx)("td",{className:"dg-num",children:k.rows??"\u2014"}),(0,r.jsx)("td",{className:"dg-muted dg-truncate",title:k.comment,children:k.comment}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,r.jsx)(ce,{icon:"play",title:e("openInQuery"),size:11,onClick:()=>t.onQuery(k)}),(0,r.jsx)(ce,{icon:"table",title:e("data"),size:11,onClick:()=>t.onOpen(k)})]})})]},k.name))})]})})]})}function an(t){let{t:e,store:n}=t,a=ve(n.connections),d=ve(n.catalog),o=a.items.find(k=>k.id===t.connectionId),f=`${t.connectionId}|${t.database.name}|${t.schemas[0]??""}`,g=d.relations[f]??[],m=a.sessions[t.connectionId],b=o?o.engine!=="redis":!1;(0,ke.useEffect)(()=>{for(let k of t.schemas.length?t.schemas:[""])n.catalog.loadRelations(t.connectionId,t.database.name,k)},[t.connectionId,t.database.name,t.schemas,n]);let y=g.filter(k=>k.kind==="table").length,A=g.filter(k=>k.kind==="view").length,$=n.bindings().find(k=>k.connectionId===t.connectionId)??null;return(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(N,{name:"database",size:12}),(0,r.jsx)("span",{className:"dg-mono",children:t.database.name}),(0,r.jsx)("span",{className:"dg-chip",children:o?.engine??""}),m?.version?(0,r.jsx)("span",{className:"dg-chip",children:m.version}):null,(0,r.jsx)("div",{className:"dg-spacer"}),b&&t.onNewQuery?(0,r.jsxs)(K,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,r.jsx)(N,{name:"play",size:10}),e("newQuery")]}):null]}),(0,r.jsxs)("div",{style:{overflow:"auto"},children:[(0,r.jsxs)("div",{className:"dg-cards",children:[(0,r.jsx)(ze,{hoverable:!0,onClick:()=>t.onOpenRelations("table"),style:{cursor:"pointer"},children:(0,r.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,r.jsx)("span",{className:"dg-stat-icon dg-stat-icon-blue",children:(0,r.jsx)(N,{name:"table",size:20})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"dg-card-value",children:y}),(0,r.jsx)("div",{className:"dg-card-label",children:e("tables")})]})]})}),(0,r.jsx)(ze,{hoverable:!0,onClick:()=>t.onOpenRelations("view"),style:{cursor:"pointer"},children:(0,r.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,r.jsx)("span",{className:"dg-stat-icon dg-stat-icon-green",children:(0,r.jsx)(N,{name:"view",size:20})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"dg-card-value",children:A}),(0,r.jsx)("div",{className:"dg-card-label",children:e("views")})]})]})}),(0,r.jsx)(ze,{hoverable:!0,children:(0,r.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,r.jsx)("span",{className:"dg-stat-icon dg-stat-icon-gold",children:(0,r.jsx)(N,{name:"folder",size:20})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"dg-card-value",children:t.schemas.length||1}),(0,r.jsx)("div",{className:"dg-card-label",children:e("schema")})]})]})}),(0,r.jsx)(ze,{hoverable:!0,children:(0,r.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,r.jsx)("span",{className:"dg-stat-icon dg-stat-icon-purple",children:(0,r.jsx)(N,{name:"archive",size:20})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"dg-card-value",children:t.database.file?Qt(t.database.file.length):"\u2014"}),(0,r.jsx)("div",{className:"dg-card-label",children:e("file")})]})]})})]}),(0,r.jsx)("div",{className:"dg-section",children:(0,r.jsx)(ze,{size:"small",title:e("agentHint"),children:(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[$&&$.connectionId===t.connectionId?(0,r.jsx)(fe,{tone:"success",children:e("projectBound").replace("{name}",$.connectionName??$.connectionId).replace("{database}",$.database)}):(0,r.jsx)(fe,{children:e("projectUnbound")}),(0,r.jsx)(fe,{children:n.meta.allowWrites?e("writesEnabled"):e("readOnlyForAgent")})]})})}),(0,r.jsx)("div",{className:"dg-section",children:(0,r.jsx)(ze,{size:"small",title:e("schema"),children:t.schemas.length>0?(0,r.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:t.schemas.map(k=>(0,r.jsx)(Oe,{color:"blue",icon:"folder",children:(0,r.jsx)("span",{className:"dg-mono",children:k})},k))}):(0,r.jsx)("div",{className:"dg-muted",children:"default"})})})]})]})}function sn(t){let{t:e,store:n}=t,a=ve(n.catalog),d=`${t.connectionId}|${t.database}|${t.schema}`,o=a.routines[d]??[],[f,g]=(0,ke.useState)("");(0,ke.useEffect)(()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let m=o.find(b=>b.name===f)??null;return(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(N,{name:"function",size:12}),(0,r.jsx)("span",{children:e("functions")}),(0,r.jsx)("span",{className:"dg-chip",children:o.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema,!0)}})]}),(0,r.jsxs)("div",{className:"dg-struct",style:{flex:1},children:[(0,r.jsx)("div",{className:"dg-struct-col",style:{flex:"0 0 46%"},children:(0,r.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:a.loading[d]?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(xe,{label:e("loading")})}):o.length===0?(0,r.jsx)(he,{title:e("noRoutines")}):(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:e("name")}),(0,r.jsx)("th",{children:e("type")}),(0,r.jsx)("th",{children:e("returnType")})]})}),(0,r.jsx)("tbody",{children:o.map(b=>(0,r.jsxs)("tr",{className:b.name===f?"dg-row-active":"",onClick:()=>g(b.name),children:[(0,r.jsx)("td",{className:"dg-mono",children:b.name}),(0,r.jsx)("td",{children:b.kind==="function"?e("functionKind"):e("procedureKind")}),(0,r.jsx)("td",{className:"dg-muted dg-truncate",children:b.returnType||"\u2014"})]},`${b.kind}-${b.name}`))})]})})}),(0,r.jsxs)("div",{className:"dg-struct-col",children:[(0,r.jsx)("div",{className:"dg-struct-head",children:e("definition")}),(0,r.jsx)("div",{className:"dg-struct-body",children:m?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"dg-row",style:{marginBottom:6},children:[(0,r.jsx)("span",{className:"dg-mono",children:m.name}),(0,r.jsx)("span",{className:"dg-tag",children:m.language||m.kind})]}),(0,r.jsx)("pre",{className:"dg-pre",children:m.definition||"\u2014"})]}):(0,r.jsx)("div",{className:"dg-muted",children:e("selectConnection")})})]})]})]})}function rn(t){let{t:e,store:n}=t,a=ve(n.catalog),d=a.accounts[t.connectionId]??[];return(0,ke.useEffect)(()=>{n.catalog.loadAccounts(t.connectionId)},[t.connectionId,n]),(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(N,{name:"user",size:12}),(0,r.jsx)("span",{children:e("users")}),(0,r.jsx)("span",{className:"dg-chip",children:d.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadAccounts(t.connectionId,!0)}})]}),(0,r.jsx)("div",{className:"dg-grid-wrap",children:a.loading[t.connectionId]?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(xe,{label:e("loading")})}):d.length===0?(0,r.jsx)(he,{title:e("noAccounts")}):(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:e("accountName")}),(0,r.jsx)("th",{children:e("accountHost")}),(0,r.jsx)("th",{children:e("accountPlugin")}),(0,r.jsx)("th",{children:e("accountPrivileged")}),(0,r.jsx)("th",{children:e("accountLocked")})]})}),(0,r.jsx)("tbody",{children:d.map(o=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{className:"dg-mono",children:o.name}),(0,r.jsx)("td",{className:"dg-mono dg-muted",children:o.host}),(0,r.jsx)("td",{className:"dg-muted",children:o.plugin}),(0,r.jsx)("td",{children:o.privileged?"\u2713":""}),(0,r.jsx)("td",{children:o.locked?"\u2713":""})]},`${o.name}@${o.host}`))})]})})]})}function on(t){let{t:e,store:n}=t,a=ve(n.queries),d=ve(n.connections),[o,f]=(0,ke.useState)("");(0,ke.useEffect)(()=>{a.items.length===0&&n.queries.load()},[a.items.length,n]);let g=o.trim().toLowerCase(),m=(0,ke.useMemo)(()=>{let b=new Map;for(let y of a.items){if(g&&!y.name.toLowerCase().includes(g)&&!y.sql.toLowerCase().includes(g))continue;let A=d.items.find(H=>H.id===y.connectionId),$=A?.name||y.connectionId||e("connections"),k=y.database||"default",B=`${$} / ${k}`,R=b.get(B)??{key:B,connectionId:y.connectionId,connectionName:$,engine:A?.engine,database:k,items:[]};R.items.push(y),b.set(B,R)}return[...b.values()].sort((y,A)=>y.key.localeCompare(A.key))},[a.items,d.items,g,e]);return(0,r.jsxs)("div",{className:"dg-content",children:[(0,r.jsxs)("div",{className:"dg-subbar",children:[(0,r.jsx)(N,{name:"bookmark",size:12}),(0,r.jsx)("span",{children:e("queries")}),(0,r.jsx)("span",{className:"dg-chip",children:a.items.length}),(0,r.jsx)("div",{className:"dg-spacer"}),(0,r.jsx)(se,{value:o,placeholder:e("search"),style:{width:180},onChange:b=>f(b.target.value)}),(0,r.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.queries.load()}})]}),a.error?(0,r.jsx)(fe,{tone:"error",children:a.error}):null,(0,r.jsx)("div",{className:"dg-grid-wrap",children:a.loading&&a.items.length===0?(0,r.jsx)("div",{className:"dg-sqlmsg",children:(0,r.jsx)(xe,{label:e("loading")})}):m.length===0?(0,r.jsx)(he,{title:e("noQueries")}):(0,r.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:14,padding:"12px 16px"},children:m.map(b=>(0,r.jsxs)("div",{className:"dg-query-category",children:[(0,r.jsxs)("div",{className:"dg-query-category-head",children:[(0,r.jsx)("span",{className:"dg-query-category-icon",children:(0,r.jsx)(N,{name:"database",size:12})}),(0,r.jsx)("span",{className:"dg-query-category-title",children:b.connectionName}),b.engine?(0,r.jsx)("span",{className:"dg-badge",children:b.engine}):null,(0,r.jsx)("span",{className:"dg-query-category-sep",children:"/"}),(0,r.jsx)("span",{className:"dg-query-category-db",children:b.database}),(0,r.jsx)("span",{className:"dg-badge",style:{marginLeft:"auto"},children:b.items.length})]}),(0,r.jsxs)("table",{className:"dg-list",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:e("queryName")}),(0,r.jsx)("th",{children:e("source")}),(0,r.jsx)("th",{children:e("updatedAt")}),(0,r.jsx)("th",{style:{width:96}})]})}),(0,r.jsx)("tbody",{children:b.items.map(y=>(0,r.jsxs)("tr",{onDoubleClick:()=>t.onOpen(y),children:[(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-list-name",children:[(0,r.jsx)(N,{name:"bookmark",size:11}),(0,r.jsx)("span",{style:{fontWeight:500},children:y.name})]})}),(0,r.jsx)("td",{children:(0,r.jsx)("span",{className:"dg-tag",children:y.scope})}),(0,r.jsx)("td",{className:"dg-muted",children:Vt(y.updatedAt)}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,r.jsx)(ce,{icon:"play",title:e("openInEditor"),size:11,onClick:()=>t.onOpen(y)}),(0,r.jsx)(ce,{icon:"trash",title:e("delete"),size:11,onClick:()=>{n.queries.remove(y.id).catch(A=>t.notify(String(A),"error"))}})]})})]},y.id))})]})]},b.key))})})]})}var ge=require("react");var w=require("react/jsx-runtime");function ln(t){let{t:e,tab:n}=t,[a,d]=(0,ge.useState)([]),[o,f]=(0,ge.useState)(Number(n.database.replace(/[^0-9]/g,""))||0),[g,m]=(0,ge.useState)("*"),[b,y]=(0,ge.useState)(""),[A,$]=(0,ge.useState)([]),[k,B]=(0,ge.useState)("0"),[R,H]=(0,ge.useState)(""),[L,T]=(0,ge.useState)(null),[j,Y]=(0,ge.useState)(""),[Q,ee]=(0,ge.useState)(null),[O,X]=(0,ge.useState)(""),[te,M]=(0,ge.useState)(!1),[I,G]=(0,ge.useState)(()=>new Set),[z,Z]=(0,ge.useState)(null),[U,oe]=(0,ge.useState)("");(0,ge.useEffect)(()=>{J.redisDatabases(n.connectionId).then(i=>d(i.databases)).catch(()=>{})},[n.connectionId]);let me=async i=>{try{let p=await J.redisScan({connectionId:n.connectionId,cursor:i?"0":k,pattern:g,type:b,database:o});$(C=>{let W=i?[]:C.slice(),ae=new Set(W.map(be=>be.key));for(let be of p.keys)ae.has(be.key)||W.push(be);return W.sort((be,Pe)=>be.key.localeCompare(Pe.key))}),B(p.cursor),X("")}catch(p){X(p instanceof Error?p.message:String(p))}};(0,ge.useEffect)(()=>{$([]),H(""),T(null),me(!0)},[n.connectionId,o]);let ye=async i=>{H(i);try{T(await J.redisKey(n.connectionId,i,o)),X("")}catch(p){T(null),X(p instanceof Error?p.message:String(p))}},le=async i=>{M(!0);try{let p=await J.redisCommand(n.connectionId,i);ee(p.reply),await me(!0),R&&await ye(R),X("")}catch(p){X(p instanceof Error?p.message:String(p))}finally{M(!1)}},x=(0,ge.useMemo)(()=>{let i=new Map;for(let p of A){let C=p.key.indexOf(":"),W=C>0?p.key.slice(0,C):"",ae=i.get(W)??[];ae.push(p),i.set(W,ae)}return[...i.entries()].sort((p,C)=>p[0]===""?1:C[0]===""?-1:p[0].localeCompare(C[0]))},[A]),s=()=>L?L.value===null||L.value===void 0?(0,w.jsx)(he,{title:e("null")}):L.type==="string"?(0,w.jsx)("pre",{className:"dg-pre",style:{padding:9},children:String(L.value)}):L.type==="hash"?(0,w.jsx)("div",{className:"dg-grid-wrap",children:(0,w.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,w.jsx)("tbody",{children:Object.entries(L.value).map(([i,p])=>(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"dg-mono",style:{width:"32%"},children:i}),(0,w.jsx)("td",{children:String(p)})]},i))})})}):Array.isArray(L.value)?(0,w.jsx)("div",{className:"dg-grid-wrap",children:(0,w.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,w.jsx)("tbody",{children:L.value.map((i,p)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"dg-rownum",children:p}),(0,w.jsx)("td",{className:"dg-mono",children:typeof i=="object"?JSON.stringify(i):String(i)})]},p))})})}):(0,w.jsx)("pre",{className:"dg-pre",style:{padding:9},children:JSON.stringify(L.value,null,2)}):(0,w.jsx)(he,{title:e("keyValue")});return(0,w.jsxs)("div",{className:"dg-redis",children:[(0,w.jsxs)("div",{className:"dg-redis-list",children:[(0,w.jsxs)("div",{className:"dg-panehead",children:[(0,w.jsx)(N,{name:"database",size:11}),e("redisKeys"),(0,w.jsx)("div",{className:"dg-spacer"}),(0,w.jsx)(we,{value:String(o),onChange:i=>f(Number(i.target.value)),children:(a.length?a:[{name:"db0",schemas:[]}]).map(i=>(0,w.jsx)("option",{value:i.name.replace("db",""),children:i.name},i.name))}),(0,w.jsx)(ce,{icon:"plus",title:e("newKey"),size:11,onClick:()=>{Z({kind:"new"}),oe("")}}),(0,w.jsx)(ce,{icon:"refresh",title:e("refresh"),size:11,onClick:()=>{me(!0)}})]}),(0,w.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,w.jsxs)("div",{className:"dg-search",children:[(0,w.jsx)(N,{name:"search",size:10}),(0,w.jsx)("input",{value:g,placeholder:e("redisPattern"),onChange:i=>m(i.target.value),onKeyDown:i=>i.key==="Enter"&&void me(!0)})]}),(0,w.jsxs)(we,{value:b,onChange:i=>{y(i.target.value),me(!0)},children:[(0,w.jsx)("option",{value:"",children:"any"}),["string","hash","list","set","zset","stream"].map(i=>(0,w.jsx)("option",{value:i,children:i},i))]})]}),(0,w.jsx)("div",{className:"dg-redis-keys",children:A.length===0?(0,w.jsx)("div",{className:"dg-muted",style:{padding:7},children:e("emptyObjects")}):x.map(([i,p])=>{let C=i===""||!I.has(i);return(0,w.jsxs)("div",{children:[i?(0,w.jsxs)("div",{className:"dg-rns",onClick:()=>G(W=>{let ae=new Set(W);return ae.has(i)?ae.delete(i):ae.add(i),ae}),children:[(0,w.jsx)("span",{className:`dg-twist${C?" dg-twist-open":""}`,children:(0,w.jsx)(N,{name:"chevron",size:8})}),(0,w.jsx)(N,{name:"folder",size:10}),(0,w.jsxs)("span",{className:"dg-truncate",style:{flex:1},children:[i,":"]}),(0,w.jsx)("span",{className:"dg-badge",children:p.length})]}):null,C?p.map(W=>(0,w.jsxs)("div",{className:`dg-rkey${W.key===R?" dg-rkey-active":""}`,onClick:()=>{ye(W.key)},title:W.key,children:[(0,w.jsx)("span",{className:"dg-truncate",style:{flex:1},children:i?W.key.slice(i.length+1):W.key}),(0,w.jsx)("span",{className:"dg-badge",children:W.type})]},W.key)):null]},i||"_")})}),k!=="0"?(0,w.jsx)("div",{className:"dg-pager",children:(0,w.jsx)(K,{size:"sm",onClick:()=>{me(!1)},children:e("scanMore")})}):null]}),(0,w.jsxs)("div",{className:"dg-redis-detail",children:[O?(0,w.jsx)(fe,{tone:"error",onClose:()=>X(""),children:O}):null,L?(0,w.jsxs)("div",{className:"dg-subbar",children:[(0,w.jsx)("span",{className:"dg-mono dg-truncate",title:L.key,children:L.key}),(0,w.jsx)("span",{className:"dg-tag",children:L.type}),(0,w.jsxs)("span",{className:"dg-chip",children:[e("ttl"),": ",L.ttl>0?`${L.ttl}s`:e("noTtl")]}),(0,w.jsx)("div",{className:"dg-spacer"}),(0,w.jsx)(K,{size:"sm",onClick:()=>{Z({kind:"rename"}),oe(L.key)},children:e("rename")}),(0,w.jsx)(K,{size:"sm",onClick:()=>{Z({kind:"ttl"}),oe(L.ttl>0?String(L.ttl):"3600")},children:e("setTtl")}),(0,w.jsx)(K,{size:"sm",onClick:()=>{Z({kind:"value"}),oe(String(L.value??""))},children:e("editValue")}),(0,w.jsx)(K,{size:"sm",variant:"danger",onClick:()=>{(async()=>{await J.redisDelete(n.connectionId,L.key,L.database??o),H(""),T(null),await me(!0),t.notify(e("deleted"),"success")})()},children:e("deleteKey")})]}):null,(0,w.jsx)("div",{className:"dg-grid-wrap",children:s()}),(0,w.jsxs)("div",{className:"dg-redis-console",children:[(0,w.jsxs)("div",{className:"dg-row",children:[(0,w.jsx)(N,{name:"play",size:10}),(0,w.jsx)(se,{value:j,placeholder:e("commandHint"),style:{flex:1},onChange:i=>Y(i.target.value),onKeyDown:i=>i.key==="Enter"&&j.trim()&&void le(j)}),(0,w.jsx)(K,{size:"sm",variant:"primary",disabled:te,onClick:()=>j.trim()&&void le(j),children:e("run")})]}),Q!==null?(0,w.jsx)("pre",{className:"dg-pre",style:{maxHeight:110,overflow:"auto"},children:JSON.stringify(Q,null,2)}):null]})]}),z?(0,w.jsx)(Se,{title:z.kind==="new"?e("newKey"):z.kind==="rename"?e("rename"):z.kind==="ttl"?e("setTtl"):e("editValue"),width:420,onClose:()=>Z(null),footer:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(K,{onClick:()=>Z(null),children:e("cancel")}),(0,w.jsx)(K,{variant:"primary",onClick:()=>{(async()=>{let i=C=>C.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),p="";z.kind==="new"&&(p=`SET "${i(U)}" ""`),z.kind==="rename"&&L&&(p=`RENAME "${i(L.key)}" "${i(U)}"`),z.kind==="ttl"&&L&&(p=`EXPIRE "${i(L.key)}" ${Number.parseInt(U,10)||0}`),z.kind==="value"&&L&&(p=`SET "${i(L.key)}" "${i(U)}"`),p&&await le(p),Z(null),t.notify(e("saved"),"success")})()},children:e("save")})]}),children:(0,w.jsx)(re,{label:z.kind==="ttl"?e("ttl"):z.kind==="value"?e("keyValue"):e("name"),children:(0,w.jsx)(se,{value:U,autoFocus:!0,onChange:i=>oe(i.target.value)})})}):null]})}var ue=require("react");var P=require("react/jsx-runtime");function dn(t){let{t:e,tab:n}=t,[a,d]=(0,ue.useState)(n.initialSql??""),[o,f]=(0,ue.useState)(null),[g,m]=(0,ue.useState)(0),[b,y]=(0,ue.useState)(!1),[A,$]=(0,ue.useState)(""),[k,B]=(0,ue.useState)(""),[R,H]=(0,ue.useState)(null),[L,T]=(0,ue.useState)(0),[j,Y]=(0,ue.useState)(!1),[Q,ee]=(0,ue.useState)(""),O=(0,ue.useRef)(null),X=(0,ue.useRef)(null),te=(0,ue.useMemo)(()=>a.split(`
`).length,[a]),M=(0,ue.useMemo)(()=>bt(a),[a]),I=(0,ue.useMemo)(()=>{let s=[];for(let i of t.tables)s.push({label:i,kind:"table"});for(let i of ft)s.push({label:i,kind:"fn"});for(let i of pt)s.push({label:i,kind:"kw"});return s},[t.tables]);(0,ue.useEffect)(()=>{n.initialSql&&d(n.initialSql)},[n.id,n.initialSql]);let G=s=>{let i=O.current;if(!i)return;let p=i.selectionStart,C=/([A-Za-z_][A-Za-z0-9_]*)$/.exec(a.slice(0,p))?.[1]??"";if(!C&&!s)return H(null);let W=C.toLowerCase(),ae=new Set,be=I.filter(je=>{let Le=je.label.toLowerCase();return W&&!Le.startsWith(W)||ae.has(Le)?!1:(ae.add(Le),!0)}).slice(0,14);if(be.length===0)return H(null);let Pe=Bt(i,p-C.length);H({items:be,index:0,left:Pe.left,top:Pe.top+18,start:p-C.length,end:p})},z=()=>{if(!R)return;let s=R.items[R.index];if(!s)return;let i=R.start+s.label.length;d(`${a.slice(0,R.start)}${s.label}${a.slice(R.end)}`),H(null),requestAnimationFrame(()=>{let p=O.current;p&&(p.focus(),p.selectionStart=p.selectionEnd=i)})},Z=async s=>{let i=s.trim();if(!i)return t.notify(e("noStatements"),"info");y(!0),$("");try{let p=await J.sql({connectionId:n.connectionId,database:n.database,sql:i});f(p),m(0);let C=p.results.find(ae=>ae.error),W=p.results[0];B(C?pe(e("queryFailed"),{ms:p.durationMs}):pe(e("queryOk"),{n:W?.rowCount??0,ms:p.durationMs})),p.results.some(ae=>ae.truncated)&&$(e("resultTruncated")),C?.error&&$(C.error)}catch(p){$(p instanceof Error?p.message:String(p)),f(null),B("")}finally{y(!1)}},U=async()=>{try{let s=await J.sqlCancel(n.connectionId);t.notify(s.cancelled?e("queryCancelled"):s.reason||e("cancelUnsupported"),s.cancelled?"info":"error")}catch(s){t.notify(s instanceof Error?s.message:String(s),"error")}},oe=()=>{let s=O.current;s&&s.selectionStart!==s.selectionEnd?Z(a.slice(s.selectionStart,s.selectionEnd)):Z(a)},me=()=>{let s=a.split(";").map(i=>i.trim()).filter(Boolean)[0];if(!s)return t.notify(e("noStatements"),"info");Z(/^explain\b/i.test(s)?s:`EXPLAIN ${s}`)},ye=s=>{if(R){if(s.key==="ArrowDown")return s.preventDefault(),H({...R,index:(R.index+1)%R.items.length});if(s.key==="ArrowUp")return s.preventDefault(),H({...R,index:(R.index-1+R.items.length)%R.items.length});if(s.key==="Enter"||s.key==="Tab")return s.preventDefault(),z();if(s.key==="Escape")return s.preventDefault(),H(null)}if((s.ctrlKey||s.metaKey)&&s.key==="Enter")return s.preventDefault(),oe();if(s.ctrlKey&&s.key===" ")return s.preventDefault(),G(!0);if(s.key==="Tab"){s.preventDefault();let i=s.currentTarget,p=i.selectionStart,C=i.selectionEnd;d(`${a.slice(0,p)}  ${a.slice(C)}`),requestAnimationFrame(()=>{i.selectionStart=i.selectionEnd=p+2})}},le=o?.results[g]??null,x=()=>o?le?le.error?(0,P.jsxs)("div",{style:{padding:9},children:[(0,P.jsx)("div",{className:"dg-err",children:le.error}),(0,P.jsx)("pre",{className:"dg-pre",style:{marginTop:7,opacity:.7},children:le.statement})]}):le.columns.length===0?(0,P.jsxs)("div",{className:"dg-sqlmsg",children:[pe(e("affected"),{n:le.affected??0})," \xB7 ",le.durationMs," ms"]}):(0,P.jsx)("div",{className:"dg-grid-wrap",children:(0,P.jsxs)("table",{className:"dg-grid",style:{width:"100%"},children:[(0,P.jsx)("thead",{children:(0,P.jsxs)("tr",{children:[(0,P.jsx)("th",{className:"dg-rownum",children:"#"}),le.columns.map(s=>(0,P.jsx)("th",{children:s.name},s.name))]})}),(0,P.jsx)("tbody",{children:le.rows.map((s,i)=>(0,P.jsxs)("tr",{children:[(0,P.jsx)("td",{className:"dg-rownum",children:i+1}),le.columns.map(p=>{let C=_e(s[p.name],e("null"));return(0,P.jsx)("td",{className:C.isNull?"dg-null":"",title:C.text,children:C.text},p.name)})]},i))})]})}):(0,P.jsx)(he,{title:e("emptyResult")}):(0,P.jsx)(he,{title:e("runHint"),hint:e("completionHint")});return(0,P.jsxs)("div",{className:"dg-sql",children:[(0,P.jsxs)("div",{className:"dg-sql-top",children:[(0,P.jsxs)("div",{className:"dg-editor",children:[(0,P.jsx)("div",{className:"dg-gutter","aria-hidden":!0,children:(0,P.jsx)("div",{style:{transform:`translateY(${-L}px)`},children:Array.from({length:te},(s,i)=>i+1).join(`
`)})}),(0,P.jsxs)("div",{className:"dg-code",children:[(0,P.jsxs)("pre",{className:"dg-hl",ref:X,"aria-hidden":!0,children:[M.map((s,i)=>s.type==="ws"?s.value:(0,P.jsx)("span",{className:`dg-tok dg-tok-${s.type==="plain"?"ident":s.type}`,children:s.value},i)),(0,P.jsx)("span",{children:"\u200B"})]}),(0,P.jsx)("textarea",{ref:O,className:"dg-sql-text",value:a,spellCheck:!1,placeholder:"SELECT * FROM ...",onChange:s=>{d(s.target.value),requestAnimationFrame(()=>G(!1))},onScroll:s=>{if(T(s.currentTarget.scrollTop),X.current){let i=s.currentTarget;X.current.scrollTop=i.scrollTop,X.current.scrollLeft=i.scrollLeft}},onKeyDown:ye,onBlur:()=>setTimeout(()=>H(null),120)}),R?(0,P.jsx)("div",{className:"dg-complete",style:{left:R.left,top:R.top},children:R.items.map((s,i)=>(0,P.jsxs)("div",{className:`dg-complete-item${i===R.index?" dg-complete-item-on":""}`,onMouseDown:p=>{p.preventDefault(),H({...R,index:i}),requestAnimationFrame(z)},children:[(0,P.jsx)("span",{children:s.label}),(0,P.jsx)("span",{className:"dg-complete-kind",children:s.kind})]},`${s.kind}-${s.label}`))}):null]})]}),(0,P.jsxs)("div",{className:"dg-sqlbar",children:[(0,P.jsxs)(K,{size:"sm",variant:"primary",disabled:b,onClick:oe,children:[b?(0,P.jsx)(xe,{}):(0,P.jsx)(N,{name:"play",size:10}),e("run")]}),b?(0,P.jsx)(K,{size:"sm",variant:"danger",onClick:()=>{U()},children:e("cancelQuery")}):null,(0,P.jsx)(K,{size:"sm",disabled:b,onClick:me,children:e("explain")}),(0,P.jsxs)(K,{size:"sm",onClick:()=>d(Lt(a)),children:[(0,P.jsx)(N,{name:"wand",size:10}),e("beautify")]}),(0,P.jsxs)(K,{size:"sm",onClick:()=>{ee(Q||`Query ${new Date().toISOString().slice(0,16).replace("T"," ")}`),Y(!0)},children:[(0,P.jsx)(N,{name:"bookmark",size:10}),e("saveQuery")]}),(0,P.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{d(""),f(null),$(""),B("")},children:e("clear")}),(0,P.jsx)("span",{className:"dg-muted dg-hint",children:e("runHint")}),(0,P.jsx)("div",{className:"dg-spacer"}),k?(0,P.jsx)("span",{className:"dg-chip",children:k}):null]})]}),o&&o.results.length>1?(0,P.jsx)("div",{className:"dg-rtabs",children:o.results.map((s,i)=>(0,P.jsxs)("button",{type:"button",className:`dg-rtab${i===g?" dg-rtab-active":""}`,onClick:()=>m(i),children:[s.error?(0,P.jsx)(N,{name:"alert",size:10}):null,pe(e("result"),{n:i+1})," \xB7 ",s.rowCount]},i))}):null,A&&!le?.error?(0,P.jsx)(fe,{tone:"error",onClose:()=>$(""),children:A}):null,(0,P.jsx)("div",{className:"dg-results",children:x()}),j?(0,P.jsxs)(Se,{title:e("saveQuery"),width:420,onClose:()=>Y(!1),footer:(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(K,{onClick:()=>Y(!1),children:e("cancel")}),(0,P.jsx)(K,{variant:"primary",onClick:()=>{(async()=>{try{await J.saveQuery({name:Q.trim()||"Query",sql:a,connectionId:n.connectionId,database:n.database,scope:"user"}),Y(!1),t.notify(e("querySaved"),"success"),t.onSaved()}catch(s){t.notify(s instanceof Error?s.message:String(s),"error")}})()},children:e("save")})]}),children:[(0,P.jsx)(re,{label:e("queryName"),children:(0,P.jsx)(se,{value:Q,autoFocus:!0,onChange:s=>ee(s.target.value)})}),(0,P.jsx)("pre",{className:"dg-pre",style:{maxHeight:160,overflow:"auto"},children:a})]}):null]})}var V=require("react");var c=require("react/jsx-runtime"),On=[50,100,200,500];function Fn(t){let e=String(t??"").toLowerCase();if(/\b(json|jsonb|xml|text|clob|ntext|longtext|mediumtext|bytea)\b/.test(e))return!0;let n=/(?:var)?char(?:acter varying)?\s*\(\s*(\d+)\s*\)/.exec(e);return n?Number(n[1])>120:!1}function cn(t){let{t:e,tab:n,engine:a}=t,[d,o]=(0,V.useState)("data"),f={connectionId:n.connectionId,database:n.database,schema:n.schema,table:n.table},g=`${f.connectionId}|${f.database}|${f.schema}|${f.table}`,[m,b]=(0,V.useState)(null),[y,A]=(0,V.useState)(""),[$,k]=(0,V.useState)(0);return(0,V.useEffect)(()=>{let B=!1;return J.describe(f.connectionId,f.database,f.schema,f.table).then(R=>{B||(b(R),A(""))}).catch(R=>{B||A(R instanceof Error?R.message:String(R))}),()=>{B=!0}},[g,$]),(0,c.jsxs)("div",{className:"dg-content",children:[(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsx)(N,{name:n.tableKind==="view"?"view":"table",size:12}),(0,c.jsx)("span",{className:"dg-mono",children:n.table}),(0,c.jsx)("span",{className:"dg-chip",children:n.database||"main"}),n.schema?(0,c.jsx)("span",{className:"dg-chip",children:n.schema}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(Yt,{value:d,onChange:o,options:[{value:"data",label:e("data")},{value:"structure",label:e("structure")}]})]}),d==="data"?(0,c.jsx)(jn,{t:e,scope:f,engine:a,notify:t.notify,meta:m,onRefreshMeta:()=>k(B=>B+1),onNewQuery:t.onNewQuery}):(0,c.jsx)(Qn,{t:e,meta:m,error:y,onRefresh:()=>k(B=>B+1)})]})}function jn({t,scope:e,engine:n,notify:a,meta:d,onRefreshMeta:o,onNewQuery:f}){let[g,m]=(0,V.useState)(1),[b,y]=(0,V.useState)(100),[A,$]=(0,V.useState)({column:"",dir:""}),[k,B]=(0,V.useState)(""),[R,H]=(0,V.useState)(!1),[L,T]=(0,V.useState)([]),[j,Y]=(0,V.useState)("AND"),[Q,ee]=(0,V.useState)(null),[O,X]=(0,V.useState)(!1),[te,M]=(0,V.useState)(""),[I,G]=(0,V.useState)(null),[z,Z]=(0,V.useState)(null),U=(0,V.useRef)(null),[oe,me]=(0,V.useState)(0),[ye,le]=(0,V.useState)(null),[x,s]=(0,V.useState)(!1),[i,p]=(0,V.useState)([]),[C,W]=(0,V.useState)(null),ae=(0,V.useRef)(null),[be,Pe]=(0,V.useState)(!1),[je,Le]=(0,V.useState)(null),Tt=(0,V.useRef)(null),st=(0,V.useRef)(!1),zt=(0,V.useRef)(null),Rt=l=>{U.current=l,Z(l)},He=l=>{ae.current=l,W(l)},it=`${e.connectionId}|${e.database}|${e.schema}|${e.table}`,[Qe,Ue]=(0,V.useState)("");(0,V.useEffect)(()=>{if(Qe===k)return;let l=setTimeout(()=>{B(Qe),m(1)},320);return()=>clearTimeout(l)},[Qe,k]);let rt=(0,V.useRef)(""),ot=(0,V.useRef)(!1),lt=`${it}|${k}|${A.column}|${A.dir}`;(0,V.useEffect)(()=>{let l=new AbortController,h=!1;X(!0),M("");let v=ot.current?"exact":rt.current===lt?"none":"auto";return J.rows({...e,page:g,pageSize:b,orderBy:A.column,orderDir:A.dir,where:k,total:v},l.signal).then(S=>{h||(rt.current=lt,ot.current=!1,U.current=null,Z(null),ae.current=null,W(null),G(null),ee(F=>({...S,total:typeof S.total=="number"?S.total:F?.total??S.rows.length,totalKind:S.totalKind==="none"&&F?F.totalKind:S.totalKind})))}).catch(S=>{h||S instanceof DOMException&&S.name==="AbortError"||(M(S instanceof Error?S.message:String(S)),ee(null))}).finally(()=>{h||X(!1)}),()=>{h=!0,l.abort()}},[it,g,b,A.column,A.dir,k,oe,lt]);let Ee=d?.columns??[],Ve=(0,V.useMemo)(()=>Ee.filter(l=>l.primaryKey).map(l=>l.name),[Ee]),It=(0,V.useCallback)(l=>{let h={};for(let v of Ve)h[v]=l[v];return h},[Ve]),Te=Q?.rows??[],Mt=Q?.total??0,dt=Math.max(1,Math.ceil(Mt/b)),$e=Ve.length===0,We=(Q?.columns??[]).filter(l=>!i.includes(l.name)),fn=Ee.length>0?Ee.map(l=>({name:l.name,type:l.type,primaryKey:!!l.primaryKey,nullable:l.nullable})):(Q?.columns??[]).map(l=>({name:l.name,type:l.type??"",primaryKey:!1,nullable:!0})),Be=(0,V.useCallback)(()=>{rt.current="",ot.current=!0,me(l=>l+1),o()},[o]);(0,V.useEffect)(()=>{G(null),Z(null)},[it,g,b,k,oe]);let De=(0,V.useMemo)(()=>{if(!I||!Q)return null;let l=[],h=0;for(let S=I.top;S<=I.bottom;S+=1){let F=Te[S];if(F)for(let ne=I.left;ne<=I.right;ne+=1){let ie=We[ne];if(!ie)continue;h+=1;let de=Number(F[ie.name]);!Number.isNaN(de)&&F[ie.name]!==null&&l.push(de)}}if(l.length===0)return{cells:h,count:0,sum:0,avg:0};let v=l.reduce((S,F)=>S+F,0);return{cells:h,count:l.length,sum:v,avg:v/l.length}},[I,Q,Te]),bn=l=>{$(h=>h.column!==l?{column:l,dir:"asc"}:h.dir==="asc"?{column:l,dir:"desc"}:{column:"",dir:""}),m(1)},vn=async()=>{if(!I||!Q)return;let l=[];for(let h=I.top;h<=I.bottom;h+=1){let v=Te[h];v&&l.push(We.slice(I.left,I.right+1).map(S=>Ge(v[S.name])).join("	"))}try{await navigator.clipboard.writeText(l.join(`
`)),a(t("copied"),"success")}catch{a(t("error"),"error")}},Pt=async()=>{let l=U.current;if(U.current=null,Z(null),!l)return;let h=l.original===null||l.original===void 0?"":String(l.original);if(l.value!==h){if($e)return a(t("noPrimaryKey"),"error");try{await J.updateRow({...e,key:l.key,changes:{[l.columnName]:l.value===""&&l.original===null?null:l.value}}),a(t("cellSaved"),"success"),Be()}catch(v){a(v instanceof Error?v.message:String(v),"error")}}},hn=async l=>{let h=Te[l];if(!h||$e||!window.confirm(t("confirmDelete")))return;let v={};for(let S of Ve)v[S]=h[S];try{await J.deleteRow({...e,key:v}),a(t("deleted"),"success"),Be()}catch(S){a(S instanceof Error?S.message:String(S),"error")}},Xe=async l=>{try{let h=await J.exportRows({...e,where:k,orderBy:A.column,orderDir:A.dir}),v=Kt(e.table);if(l==="csv"){let S=h.columns.map(ne=>ne.name),F=[S.map(Ge).join(",")].concat(h.rows.map(ne=>S.map(ie=>Ge(ne[ie])).join(","))).join(`\r
`);Je(`${v}.csv`,"text/csv",F)}else l==="json"?Je(`${v}.json`,"application/json",JSON.stringify(h.rows,null,2)):l==="insert"?Je(`${v}.sql`,"application/sql",Ot(n,e,h.columns,h.rows)):Je(`${v}.md`,"text/markdown",Ft(h.columns,h.rows));h.truncated&&a(pe(t("exportTruncated"),{n:h.rows.length}),"info")}catch(h){a(h instanceof Error?h.message:String(h),"error")}},$t=200,yn=async l=>{let h=await l.text(),v=jt(h);if(v.errors.length>0){a(pe(t("importFailed"),{n:0,error:v.errors.slice(0,3).join("; ")}),"error");return}if(v.header.length===0||v.rows.length===0){a(t("importEmpty"),"error");return}let S=new Set((Ee.length?Ee:Q?.columns??[]).map(de=>de.name));if(S.size===0){a(t("importNoColumns"),"error");return}let F=v.header.filter(de=>!S.has(de));if(F.length>0){a(pe(t("importUnknownColumns"),{cols:F.join(", ")}),"error");return}let ne=v.rows.map(de=>{let Re={};return v.header.forEach((gt,Cn)=>{let Dt=de[Cn]??"";Re[gt]=Dt===""?null:Dt}),Re});s(!0);let ie=0;try{for(let de=0;de<ne.length;de+=$t){let Re=ne.slice(de,de+$t),gt=await J.insertRows({...e,rows:Re});ie+=gt.inserted}a(pe(t("importDone"),{n:ie}),"success"),Be()}catch(de){let Re=de instanceof Error?de.message:String(de);a(pe(t("importFailed"),{n:ie,error:Re}),"error")}finally{s(!1)}},xn=async()=>{try{let l=await J.insertRow({...e,values:{}});a(l.affected>0?t("rowInserted"):t("insertRowFailed"),l.affected>0?"success":"error"),Be()}catch(l){a(l instanceof Error?l.message:String(l),"error")}},wn=l=>{let h=Te[l];if(!h||$e)return;if(O)return a(t("loading"),"info");let v=(Q?.columns??[]).map(ne=>ne.name),S={},F={};for(let ne of v){let ie=h[ne];F[ne]=ie,S[ne]=ie==null?"":String(ie)}He({key:It(h),original:F,draft:S,fields:v})},kn=async()=>{let l=ae.current;if(!l)return;let h={};for(let v of l.fields){let S=l.original[v],F=S==null?"":String(S),ne=l.draft[v]??"";if(ne===F)continue;let ie=Ee.find(de=>de.name===v);h[v]=ne===""&&(ie?.nullable??!0)?null:ne}if(Object.keys(h).length===0){He(null);return}Pe(!0);try{await J.updateRow({...e,key:l.key,changes:h}),a(t("rowSaved"),"success"),He(null),Be()}catch(v){a(v instanceof Error?v.message:String(v),"error")}finally{Pe(!1)}},ct=(l,h,v)=>{G(S=>v&&S?{top:Math.min(S.top,l),left:Math.min(S.left,h),bottom:Math.max(S.bottom,l),right:Math.max(S.right,h)}:{top:l,left:h,bottom:l,right:h})},Nn=l=>{if((l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="c"){l.preventDefault(),vn();return}if(!I)return;let v={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[l.key];if(!v)return;l.preventDefault();let S=Math.max(0,Math.min(Te.length-1,I.top+v[0])),F=Math.max(0,Math.min(We.length-1,I.left+v[1]));ct(S,F,l.shiftKey)},Sn=We.map((l,h)=>(0,c.jsxs)("th",{className:A.column===l.name?"dg-th-sorted":"",onClick:()=>bn(l.name),title:l.name,children:[l.name,A.column===l.name?(0,c.jsx)("span",{className:"dg-sortmark",children:A.dir==="desc"?"\u25BC":"\u25B2"}):null,Ve.includes(l.name)?(0,c.jsx)("span",{className:"dg-colkey",title:t("primaryKey"),children:(0,c.jsx)(N,{name:"key",size:10})}):null,(0,c.jsx)("span",{className:"dg-colresize",onMouseDown:v=>{v.stopPropagation();let S=v.clientX,F=v.target.parentElement,ne=F?.offsetWidth??160,ie=Re=>{F&&(F.style.width=`${Math.max(60,ne+Re.clientX-S)}px`)},de=()=>{window.removeEventListener("mousemove",ie),window.removeEventListener("mouseup",de)};window.addEventListener("mousemove",ie),window.addEventListener("mouseup",de)},onClick:v=>v.stopPropagation()})]},l.name));return(0,c.jsxs)("div",{className:"dg-content",children:[$e?(0,c.jsx)(fe,{tone:"info",children:t("noPrimaryKey")}):null,te?(0,c.jsx)(fe,{tone:"error",onClose:()=>M(""),children:te}):null,(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsxs)(K,{size:"sm",active:!!k,onClick:()=>{let l=vt(n,{joiner:j,conditions:L});Ue(l),B(l),m(1)},children:[(0,c.jsx)(N,{name:"filter",size:11}),t("filter")]}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>H(l=>!l),children:t("filterBuilder")}),(0,c.jsx)(se,{value:Qe,placeholder:t("rawWhere"),style:{flex:1,minWidth:120,maxWidth:380},onChange:l=>Ue(l.target.value),onKeyDown:l=>{l.key==="Enter"&&(B(Qe),m(1))}}),k?(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{Ue(""),B(""),T([]),m(1)},children:t("clear")}):null,f&&n!=="redis"?(0,c.jsxs)(K,{size:"sm",variant:"tonal",onClick:f,title:t("newQuery"),children:[(0,c.jsx)(N,{name:"play",size:10}),t("newQuery")]}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsxs)("span",{className:"dg-chip",title:Q?.totalKind==="estimate"?t("estimatedTotal"):void 0,children:[Q?.totalKind==="estimate"?"\u2248 ":"",(0,c.jsx)("b",{children:Mt})," ",t("rows")]}),(0,c.jsx)(ce,{icon:"refresh",title:t("refresh"),onClick:Be}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{xn()},children:t("insertRow")}),(0,c.jsx)("input",{ref:Tt,type:"file",accept:".csv,text/csv",style:{display:"none"},onChange:l=>{let h=l.target.files?.[0];h&&yn(h),l.target.value=""}}),(0,c.jsxs)(K,{size:"sm",variant:"ghost",disabled:x,onClick:()=>Tt.current?.click(),children:[x?(0,c.jsx)(xe,{}):null,t("importCsv")]}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:l=>{let h=l.currentTarget.getBoundingClientRect();Le({x:h.left,y:h.bottom+2})},children:t("columnChooser")}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:l=>{let h=l.currentTarget.getBoundingClientRect();le({x:h.left,y:h.bottom+2})},children:t("exportAs")})]}),R?(0,c.jsxs)("div",{className:"dg-subbar",style:{gap:6,flexWrap:"wrap"},children:[(0,c.jsxs)(we,{value:j,onChange:l=>Y(l.target.value),children:[(0,c.jsx)("option",{value:"AND",children:t("matchAll")}),(0,c.jsx)("option",{value:"OR",children:t("matchAny")})]}),L.map((l,h)=>(0,c.jsxs)("span",{className:"dg-row",style:{gap:3},children:[(0,c.jsx)(we,{value:l.column,onChange:v=>T(S=>S.map((F,ne)=>ne===h?{...F,column:v.target.value}:F)),children:Ee.map(v=>(0,c.jsx)("option",{value:v.name,children:v.name},v.name))}),(0,c.jsx)(we,{value:l.op,onChange:v=>T(S=>S.map((F,ne)=>ne===h?{...F,op:v.target.value}:F)),children:Ht.map(v=>(0,c.jsx)("option",{value:v,children:v},v))}),(0,c.jsx)(se,{value:l.value,style:{width:120},onChange:v=>T(S=>S.map((F,ne)=>ne===h?{...F,value:v.target.value}:F))}),(0,c.jsx)(ce,{icon:"x",title:t("delete"),size:10,onClick:()=>T(v=>v.filter((S,F)=>F!==h))})]},h)),(0,c.jsxs)(K,{size:"sm",onClick:()=>T(l=>l.concat({column:Ee[0]?.name??"",op:"=",value:""})),children:[(0,c.jsx)(N,{name:"plus",size:10}),t("addCondition")]}),(0,c.jsx)(K,{size:"sm",variant:"primary",onClick:()=>{let l=vt(n,{joiner:j,conditions:L});Ue(l),B(l),m(1)},children:t("apply")})]}):null,(0,c.jsxs)("div",{className:"dg-grid-wrap",children:[O&&!Q?(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(xe,{label:t("loading")})}):null,Q&&Te.length===0?(0,c.jsx)(he,{title:t("emptyTable")}):null,Q&&Te.length>0?(0,c.jsxs)("table",{className:"dg-grid",ref:zt,tabIndex:0,onKeyDown:Nn,children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"dg-rownum",children:"#"}),Sn,(0,c.jsx)("th",{style:{width:26}})]})}),(0,c.jsx)("tbody",{children:Te.map((l,h)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:`dg-rownum${$e?"":" dg-rownum-editable"}`,title:$e?void 0:t("editRow"),onClick:()=>wn(h),children:(g-1)*b+h+1}),We.map((v,S)=>{let F=_e(l[v.name],t("null")),ne=I&&h>=I.top&&h<=I.bottom&&S>=I.left&&S<=I.right;return z&&z.rowIndex===h&&z.columnName===v.name?(0,c.jsx)("td",{className:"dg-cell-editing",children:(0,c.jsx)("input",{autoFocus:!0,value:z.value,onChange:ie=>Rt({...z,value:ie.target.value}),onBlur:()=>{Pt()},onKeyDown:ie=>{ie.key==="Enter"&&(ie.preventDefault(),Pt()),ie.key==="Escape"&&(U.current=null,Z(null))}})},v.name):(0,c.jsx)("td",{className:`${ne?"dg-cell-selected":""}${F.isNull?" dg-null":""}${/int|numeric|decimal|real|double|float|money/i.test(v.type??"")?" dg-cell-num":""}`,title:F.isNull?t("null"):F.text,onMouseDown:ie=>{st.current=!0,zt.current?.focus(),ct(h,S,ie.shiftKey);let de=()=>{st.current=!1,window.removeEventListener("mouseup",de)};window.addEventListener("mouseup",de)},onMouseEnter:()=>{st.current&&ct(h,S,!1)},onDoubleClick:()=>{if($e)return a(t("noPrimaryKey"),"error");if(O)return a(t("loading"),"info");Rt({rowIndex:h,columnName:v.name,key:It(l),original:l[v.name],value:F.isNull?"":String(l[v.name])})},children:F.text},v.name)}),(0,c.jsx)("td",{children:(0,c.jsx)(ce,{icon:"trash",title:t("deleteRow"),size:11,onClick:()=>{hn(h)}})})]},h))})]}):null]}),(0,c.jsxs)("div",{className:"dg-pager",children:[(0,c.jsx)(ce,{icon:"chevronLeft",title:t("prev"),size:11,disabled:g<=1,onClick:()=>m(l=>Math.max(1,l-1))}),(0,c.jsx)("span",{children:pe(t("page"),{page:g,pages:dt})}),(0,c.jsx)(ce,{icon:"chevron",title:t("next"),size:11,disabled:g>=dt,onClick:()=>m(l=>Math.min(dt,l+1))}),(0,c.jsx)("div",{className:"dg-spacer"}),De&&De.cells>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"dg-chip",children:pe(t("selection"),{n:De.cells})}),De.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("sum")," ",(0,c.jsx)("b",{children:De.sum.toFixed(2)})]}):null,De.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("avg")," ",(0,c.jsx)("b",{children:De.avg.toFixed(2)})]}):null]}):null,(0,c.jsx)("span",{children:t("pageSize")}),(0,c.jsx)(we,{value:String(b),onChange:l=>{y(Number(l.target.value)),m(1)},children:On.map(l=>(0,c.jsx)("option",{value:String(l),children:l},l))})]}),je?(0,c.jsx)(Fe,{x:je.x,y:je.y,onClose:()=>Le(null),items:[...(Q?.columns??[]).map(l=>{let h=!i.includes(l.name);return{label:l.name,icon:h?"check":void 0,onClick:()=>p(v=>v.includes(l.name)?v.filter(S=>S!==l.name):v.concat(l.name))}}),...i.length>0?[{separator:!0},{label:t("showAll"),icon:"columns",onClick:()=>p([])}]:[]]}):null,ye?(0,c.jsx)(Fe,{x:ye.x,y:ye.y,onClose:()=>le(null),items:[{label:t("exportCsv"),onClick:()=>{Xe("csv")}},{label:t("exportJson"),onClick:()=>{Xe("json")}},{label:t("exportInsert"),onClick:()=>{Xe("insert")}},{label:t("exportMarkdown"),onClick:()=>{Xe("markdown")}}]}):null,C?(0,c.jsx)(Se,{title:`${t("editRow")} \xB7 ${Object.values(C.key).map(l=>String(l)).join(", ")}`,width:560,busy:be,onClose:()=>He(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(K,{onClick:()=>He(null),children:t("cancel")}),(0,c.jsx)(K,{variant:"primary",disabled:be,onClick:()=>{kn()},children:t("save")})]}),children:(0,c.jsx)("div",{className:"dg-form",children:fn.map(l=>{let h=C.draft[l.name]??"",v=S=>{let F=ae.current;F&&He({...F,draft:{...F.draft,[l.name]:S}})};return(0,c.jsx)(re,{label:`${l.name}${l.primaryKey?" \xB7 PK":""}`,children:Fn(l.type)?(0,c.jsx)(et,{rows:3,value:h,onChange:S=>v(S.target.value)}):(0,c.jsx)(se,{value:h,placeholder:l.nullable?t("null"):"",onChange:S=>v(S.target.value)})},l.name)})})}):null]})}function Qn({t,meta:e,error:n,onRefresh:a}){let d=e;return n?(0,c.jsx)(fe,{tone:"error",children:n}):d?(0,c.jsxs)("div",{className:"dg-struct",children:[(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-fields",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("columns"),(0,c.jsx)("span",{className:"dg-badge",children:d.columns.length}),(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(ce,{icon:"refresh",title:t("refresh"),size:11,onClick:a})]}),(0,c.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:(0,c.jsxs)("table",{className:"dg-grid dg-grid-fixed",style:{width:"100%"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{style:{width:"30%"},children:t("name")}),(0,c.jsx)("th",{style:{width:"34%"},children:t("type")}),(0,c.jsx)("th",{style:{width:"12%"},children:t("nullable")}),(0,c.jsx)("th",{style:{width:"24%"},children:t("default")})]})}),(0,c.jsx)("tbody",{children:d.columns.map(o=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsxs)("span",{className:"dg-row",children:[o.primaryKey?(0,c.jsx)(N,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono dg-truncate",children:o.name})]})}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:o.type,children:o.type}),(0,c.jsx)("td",{children:o.nullable?"YES":"NO"}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:o.defaultValue??"",children:o.defaultValue===null?"\u2014":String(o.defaultValue)})]},o.name))})]})})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-indexes",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("indexes"),(0,c.jsx)("span",{className:"dg-badge",children:d.indexes.length})]}),(0,c.jsx)("div",{className:"dg-struct-body",children:d.indexes.length===0?(0,c.jsx)("div",{className:"dg-muted",children:t("noIndexes")}):d.indexes.map(o=>(0,c.jsxs)("div",{className:"dg-idx",children:[o.primary?(0,c.jsx)(N,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono",children:o.name}),(0,c.jsx)("span",{className:"dg-tag",children:o.unique?"unique":"index"}),(0,c.jsx)("span",{className:"dg-muted dg-truncate",children:o.columns.join(", ")})]},o.name))})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-ddl",children:[(0,c.jsx)("div",{className:"dg-struct-head",children:t("ddl")}),(0,c.jsx)("div",{className:"dg-struct-body",children:(0,c.jsx)("pre",{className:"dg-pre",children:d.ddl||"\u2014"})})]})]}):(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(xe,{label:t("loading")})})}function gn(t,e){return`SELECT * FROM ${Ke(t,e)} LIMIT 100;`}var Ae=require("react");var D=require("react/jsx-runtime"),Vn={red:"var(--dsw-alias-state-error-primary)",yellow:"var(--dsw-alias-state-warn-primary)",green:"var(--dsw-alias-state-success-primary)"};function un(t){let{store:e,t:n}=t,a=ve(e.connections),d=ve(e.catalog),[o,f]=(0,Ae.useState)(""),[g,m]=(0,Ae.useState)(()=>new Set),[b,y]=(0,Ae.useState)(()=>new Set),[A,$]=(0,Ae.useState)(()=>new Set),k=(M,I)=>I(G=>{let z=new Set(G);return z.has(M)?z.delete(M):z.add(M),z}),B=o.trim().toLowerCase(),R=(0,Ae.useMemo)(()=>{let M=new Map;for(let I of a.items){let G=I.group||n("noGroups"),z=M.get(G)??[];z.push(I),M.set(G,z)}return[...M.entries()].sort((I,G)=>I[0].localeCompare(G[0]))},[a.items,n]),H=async M=>{e.connections.select(M.id);let I=e.connections.session(M.id).status;if(I==="open"||I==="opening"){k(M.id,m);return}m(G=>new Set(G).add(M.id)),await e.connections.connect(M.id)},L=async(M,I)=>{t.onSelectDatabase(M,I);let G=`${M.id}|${I.name}`;y(z=>new Set(z).add(G)),M.engine!=="redis"&&await e.catalog.loadRelations(M.id,I.name,I.schemas[0]??"")},T=(M,I,G,z,Z)=>(0,D.jsxs)("div",{className:"dg-trow",style:{paddingLeft:Z*13+4},title:`${z.name}${z.rows!==null?` \xB7 ${z.rows} rows`:""}`,onClick:()=>t.onOpenTable(M,I,G,z),children:[(0,D.jsx)("span",{className:"dg-twist"}),(0,D.jsx)("span",{className:"dg-ticon",children:(0,D.jsx)(N,{name:z.kind==="view"?"view":"table",size:11})}),(0,D.jsx)("span",{className:"dg-tlabel",children:z.name}),z.rows!==null?(0,D.jsx)("span",{className:"dg-badge",children:z.rows}):null]},`${M.id}|${I.name}|${G}|${z.name}`),j=(M,I)=>{let G=`${M.id}|${I.name}`,z=b.has(G),Z=I.schemas.length?I.schemas:[""];return(0,D.jsxs)("div",{children:[(0,D.jsxs)("div",{className:`dg-trow dg-trow-db${t.selectedDatabaseKey===G?" dg-trow-active":""}`,title:I.name,onClick:()=>{L(M,I)},onContextMenu:U=>{U.preventDefault(),t.onDatabaseMenu(U,M,I)},children:[(0,D.jsx)("span",{className:`dg-twist${z?" dg-twist-open":""}`,onClick:U=>{U.stopPropagation(),k(G,y),!z&&M.engine!=="redis"&&e.catalog.loadRelations(M.id,I.name,Z[0]??"")},children:(0,D.jsx)(N,{name:"chevron",size:9})}),(0,D.jsx)("span",{className:"dg-ticon",children:(0,D.jsx)(N,{name:"database",size:11})}),(0,D.jsx)("span",{className:"dg-tlabel",children:I.name}),I.schemas.length>1?(0,D.jsx)("span",{className:"dg-badge",children:I.schemas.length}):null]}),z?Z.map(U=>{let oe=`${G}|${U}`,me=!U||A.has(oe),ye=d.relations[`${M.id}|${I.name}|${U}`]??[],le=d.loading[`${M.id}|${I.name}|${U}`]===!0;return(0,D.jsxs)("div",{children:[U?(0,D.jsxs)("div",{className:"dg-trow",style:{paddingLeft:17},onClick:()=>{k(oe,$),me||e.catalog.loadRelations(M.id,I.name,U)},children:[(0,D.jsx)("span",{className:`dg-twist${me?" dg-twist-open":""}`,children:(0,D.jsx)(N,{name:"chevron",size:9})}),(0,D.jsx)("span",{className:"dg-ticon",children:(0,D.jsx)(N,{name:"folder",size:11})}),(0,D.jsx)("span",{className:"dg-tlabel",children:U})]}):null,me?le&&ye.length===0?(0,D.jsx)("div",{className:"dg-muted",style:{padding:`2px 8px 2px ${(U?3:2)*13+16}px`},children:n("loading")}):ye.map(x=>T(M,I,U,x,U?3:2)):null]},U||"_default")}):null]},G)},[Y,Q]=(t.selectedDatabaseKey||"").split("|"),ee=a.items.find(M=>M.id===Y),O=ee?ee.engine!=="redis":!1,X=!!(ee&&Q&&O),te=ee&&Q?e.connections.session(ee.id).databases.find(M=>M.name===Q)??{name:Q,schemas:[""]}:null;return(0,D.jsxs)("div",{className:"dg-tree",children:[(0,D.jsxs)("div",{className:"dg-panehead",children:[(0,D.jsx)(N,{name:"database",size:11}),n("connections"),(0,D.jsx)("span",{className:"dg-badge",children:a.items.length}),(0,D.jsx)("div",{className:"dg-spacer"}),t.onNewConnection?(0,D.jsx)(ce,{icon:"plus",title:n("newConnection"),size:11,onClick:t.onNewConnection}):null,t.onOpenWorkspaces?(0,D.jsx)(ce,{icon:"link",title:n("workspaces"),size:11,onClick:t.onOpenWorkspaces}):null,(0,D.jsx)(ce,{icon:"refresh",title:n("refresh"),size:11,onClick:()=>{e.connections.load(),e.meta.load()}})]}),(0,D.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,D.jsxs)("div",{className:"dg-search",children:[(0,D.jsx)(N,{name:"search",size:10}),(0,D.jsx)("input",{value:o,placeholder:n("search"),onChange:M=>f(M.target.value)})]}),X&&t.onNewQuery&&ee&&te?(0,D.jsxs)(K,{size:"sm",variant:"tonal",title:n("newQuery"),onClick:()=>t.onNewQuery?.(ee,te),children:[(0,D.jsx)(N,{name:"play",size:10}),n("newQuery")]}):null]}),(0,D.jsxs)("div",{className:"dg-tree-scroll",children:[a.loading&&a.items.length===0?(0,D.jsx)("div",{className:"dg-muted",style:{padding:8},children:n("loading")}):null,a.error?(0,D.jsx)("div",{className:"dg-banner dg-banner-error",children:a.error}):null,R.map(([M,I])=>{let G=I.filter(z=>!B||z.name.toLowerCase().includes(B)?!0:e.connections.session(z.id).databases.some(U=>U.name.toLowerCase().includes(B)));return G.length===0?null:(0,D.jsxs)("div",{children:[(0,D.jsxs)("div",{className:"dg-group",children:[(0,D.jsx)("span",{className:"dg-twist"}),(0,D.jsx)("span",{className:"dg-truncate",children:M}),(0,D.jsx)("span",{className:"dg-badge",children:G.length})]}),G.map(z=>{let Z=e.connections.session(z.id),U=g.has(z.id)&&Z.status==="open";return(0,D.jsxs)("div",{children:[(0,D.jsxs)("div",{className:`dg-trow${a.activeId===z.id?" dg-trow-active":""}`,onClick:()=>{H(z)},onContextMenu:oe=>{oe.preventDefault(),t.onConnectionMenu(oe,z)},title:`${z.name} \xB7 ${z.engine}`,children:[(0,D.jsx)("span",{className:`dg-twist${U?" dg-twist-open":""}`,children:(0,D.jsx)(N,{name:"chevron",size:9})}),z.color!=="none"?(0,D.jsx)("span",{className:"dg-colorbar",style:{background:Vn[z.color]}}):null,(0,D.jsx)("span",{className:"dg-ticon",children:(0,D.jsx)(N,{name:"database",size:12})}),(0,D.jsx)("span",{className:"dg-tlabel",children:z.name}),(0,D.jsx)("span",{className:"dg-badge",children:z.engine}),(0,D.jsx)(Gt,{status:Z.status})]}),Z.status==="opening"?(0,D.jsxs)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:[n("connect"),"\u2026"]}):null,Z.status==="error"?(0,D.jsx)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:Z.error||n("error")}):null,U?Z.databases.map(oe=>j(z,oe)):null]},z.id)})]},M)}),!a.loading&&a.items.length===0?(0,D.jsx)("div",{className:"dg-muted dg-hint",style:{padding:10},children:n("selectConnection")}):null]})]})}var q=require("react/jsx-runtime"),Wn=[{id:"tables",labelKey:"tables",icon:"table",target:"relations",relation:"table"},{id:"views",labelKey:"views",icon:"view",target:"relations",relation:"view"},{id:"functions",labelKey:"functions",icon:"function",target:"routines"},{id:"users",labelKey:"users",icon:"user",target:"accounts"},{id:"queries",labelKey:"queries",icon:"bookmark",target:"queries"}];function mn({t}){let e=t??(s=>s),[n]=(0,Ne.useState)(()=>new Ze),a=ve(n.connections),d=ve(n.meta),o=ve(n.tabs),[f,g]=(0,Ne.useState)(null),[m,b]=(0,Ne.useState)(null),[y,A]=(0,Ne.useState)(null),[$,k]=(0,Ne.useState)(null),[B,R]=(0,Ne.useState)(null),[H,L]=(0,Ne.useState)(262);(0,Ne.useEffect)(()=>{n.bootstrap()},[n]),(0,Ne.useEffect)(()=>{if(!B)return;let s=setTimeout(()=>R(null),3600);return()=>clearTimeout(s)},[B]);let T=(s,i="info")=>R({message:s,tone:i}),j=s=>a.items.find(i=>i.id===s),Y=s=>j(s)?.engine??"sqlite",Q=(s,i)=>{let p=i.schemas[0]??"";if(g({connectionId:s.id,database:i.name,schema:p}),s.engine==="redis"){n.tabs.open({id:`redis:${s.id}:${i.name}`,kind:"redis",connectionId:s.id,database:i.name,title:i.name});return}n.catalog.loadRelations(s.id,i.name,p),n.tabs.open({id:`relations:${s.id}:${i.name}:${p}:table`,kind:"relations",connectionId:s.id,database:i.name,schema:p,relation:"table",title:i.name})},ee=(s,i)=>{g({connectionId:s.id,database:i.name,schema:i.schemas[0]??""}),n.tabs.open({id:`overview:${s.id}:${i.name}`,kind:"overview",connectionId:s.id,database:i.name,title:i.name})},O=(s,i,p,C)=>{n.tabs.open({id:`table:${s.id}:${i}:${p}:${C.name}`,kind:"table",connectionId:s.id,database:i,schema:p,table:C.name,tableKind:C.kind,title:C.name})},X=(s,i="table",p=f)=>{if(s==="queries"){n.tabs.open({id:"queries",kind:"queries",connectionId:"",database:"",schema:"",title:e("queries")});return}if(!p)return T(e("selectDatabase"),"info");if(s==="accounts"){n.tabs.open({id:`accounts:${p.connectionId}`,kind:"accounts",connectionId:p.connectionId,database:p.database,schema:"",title:e("users")});return}if(s==="relations"){n.tabs.open({id:`relations:${p.connectionId}:${p.database}:${p.schema}:${i}`,kind:"relations",connectionId:p.connectionId,database:p.database,schema:p.schema,relation:i,title:p.database});return}n.tabs.open({id:`${s}:${p.connectionId}:${p.database}:${p.schema}`,kind:s,connectionId:p.connectionId,database:p.database,schema:p.schema,title:e(s==="routines"?"functions":"users")})},te=(s,i,p)=>{let C=s??(f?j(f.connectionId):null);if(!C||C.engine==="redis")return;let W=i??(f&&f.connectionId===C.id?f.database:n.connections.session(C.id).databases[0]?.name??"");if(!W)return;let ae=o.tabs.filter(be=>be.kind==="sql").length+1;n.tabs.open({id:`sql:${C.id}:${W}:${Date.now()}`,kind:"sql",connectionId:C.id,database:W,title:`${e("query")} ${ae} (${W})`,initialSql:p??""})},M=s=>{let i=j(s.connectionId)??a.items[0];if(!i)return b({kind:"connection"});n.tabs.open({id:`sql:saved:${s.id}:${Date.now()}`,kind:"sql",connectionId:i.id,database:s.database,title:s.name,initialSql:s.sql})},I=async s=>{let i=m&&m.kind==="connection"?m.initial:void 0;if(i)await n.connections.update(i.id,s),n.tabs.closeConnection(i.id),T(e("saved"),"success");else{let p=await n.connections.create(s);T(p.ok?pe(e("testOk"),{version:p.serverVersion??"",ms:p.latencyMs??0}):e("saved"),p.ok?"success":"info")}b(null)},G=(s,i)=>{let p=n.connections.session(i.id).status;k({x:s.clientX,y:s.clientY,items:[p==="open"?{label:e("disconnect"),icon:"unplug",onClick:()=>{n.connections.disconnect(i.id)}}:{label:e("connect"),icon:"plug",onClick:()=>{n.connections.connect(i.id)}},{label:e("test"),icon:"check",onClick:()=>{n.connections.test(i.id).then(C=>T(pe(e("testOk"),{version:C.serverVersion??"",ms:C.latencyMs??0}),"success"),C=>T(C instanceof Error?C.message:String(C),"error"))}},{separator:!0},...i.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>te(i)}]:[],{label:e("edit"),icon:"pencil",onClick:()=>b({kind:"connection",initial:i})},{label:e("refresh"),icon:"refresh",onClick:()=>{n.connections.reloadDatabases(i.id)}},{separator:!0},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>A(i)}]})},z=(s,i,p)=>{let C={connectionId:i.id,database:p.name,schema:p.schemas[0]??""},W=(ae,be="table")=>{g(C),X(ae,be,C)};k({x:s.clientX,y:s.clientY,items:[{label:e("overview"),icon:"info",onClick:()=>ee(i,p)},{label:e("tables"),icon:"table",onClick:()=>W("relations","table")},{label:e("views"),icon:"view",onClick:()=>W("relations","view")},{label:e("functions"),icon:"function",onClick:()=>W("routines")},{separator:!0},...i.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>te(i,p.name)}]:[]]})},Z=n.bindings(),U=f?`${f.connectionId}|${f.database}`:"",oe=o.tabs.find(s=>s.id===o.activeId)??null,me=(0,q.jsxs)("div",{className:"dg-toolbar",children:[(0,q.jsxs)("div",{className:"dg-brand",children:[(0,q.jsx)("span",{className:"dg-brand-badge",children:(0,q.jsx)(N,{name:"database",size:15})}),(0,q.jsx)("span",{className:"dg-brand-title",children:e("panel")})]}),(0,q.jsx)("div",{className:"dg-toolbar-divider"}),(0,q.jsx)("div",{className:"dg-toolgroup dg-obj-pills",children:Wn.map(s=>(0,q.jsxs)(K,{size:"sm",variant:"ghost",onClick:()=>X(s.target,s.relation),title:e(s.labelKey),children:[(0,q.jsx)(N,{name:s.icon,size:11}),e(s.labelKey)]},s.id))})]}),ye=o.tabs.length?(0,q.jsx)("div",{className:"dg-tabs",role:"tablist",children:o.tabs.map(s=>(0,q.jsxs)("div",{role:"tab",tabIndex:s.id===o.activeId?0:-1,"aria-selected":s.id===o.activeId,className:`dg-tab${s.id===o.activeId?" dg-tab-active":""}`,onClick:()=>n.tabs.activate(s.id),onKeyDown:i=>{if(i.key==="Enter"||i.key===" "){i.preventDefault(),n.tabs.activate(s.id);return}let p=i.key==="ArrowRight"?1:i.key==="ArrowLeft"?-1:0;if(p===0)return;i.preventDefault();let C=i.currentTarget.parentElement?.children,W=C?.length??0;if(!W)return;let ae=o.tabs[(o.tabs.findIndex(be=>be.id===s.id)+p+W)%W];ae&&(n.tabs.activate(ae.id),C?.[o.tabs.indexOf(ae)]?.focus())},title:s.title,children:[(0,q.jsx)(N,{name:s.kind==="table"?s.tableKind==="view"?"view":"table":s.kind==="sql"?"play":s.kind==="queries"?"bookmark":s.kind==="redis"?"database":"info",size:10}),(0,q.jsx)("span",{className:"dg-tab-label",children:s.title}),(0,q.jsx)("button",{type:"button",className:"dg-tab-close","aria-label":`${e("close")} ${s.title}`,onClick:i=>{i.stopPropagation(),n.tabs.close(s.id)},children:(0,q.jsx)(N,{name:"x",size:9})})]},s.id))}):null,le=o.tabs.map(s=>{let i=j(s.connectionId),p=(()=>{switch(s.kind){case"overview":{let C=n.connections.session(s.connectionId).databases.find(W=>W.name===s.database);return C?(0,q.jsx)(an,{t:e,store:n,connectionId:s.connectionId,database:C,schemas:C.schemas,onOpenRelations:W=>X("relations",W),onNewQuery:()=>te(i,s.database)}):null}case"table":return(0,q.jsx)(cn,{t:e,tab:s,engine:Y(s.connectionId),notify:T,onNewQuery:()=>te(i,s.database)});case"sql":return(0,q.jsx)(dn,{t:e,tab:s,tables:n.catalog.relationsOf(`${s.connectionId}|${s.database}|`).map(C=>C.name),notify:T,onSaved:()=>{n.queries.load()}});case"relations":return(0,q.jsx)(nn,{t:e,store:n,connectionId:s.connectionId,database:s.database,schema:s.schema,kind:s.relation,onOpen:C=>{i&&O(i,s.database,s.schema,C)},onQuery:C=>te(i,s.database,gn(Y(s.connectionId),C.name)),onNewQuery:()=>te(i,s.database),notify:T});case"routines":return(0,q.jsx)(sn,{t:e,store:n,connectionId:s.connectionId,database:s.database,schema:s.schema});case"accounts":return(0,q.jsx)(rn,{t:e,store:n,connectionId:s.connectionId});case"queries":return(0,q.jsx)(on,{t:e,store:n,onOpen:M,notify:T});case"redis":return(0,q.jsx)(ln,{t:e,tab:s,notify:T});default:return null}})();return(0,q.jsx)("div",{className:"dg-pane",style:{display:s.id===o.activeId?"contents":"none"},"aria-hidden":s.id!==o.activeId,children:p},s.id)}),x=(0,q.jsxs)("div",{className:"dg-status",children:[a.activeId?(0,q.jsxs)("span",{className:"dg-status-item",children:[(0,q.jsx)(N,{name:"database",size:10}),(0,q.jsx)("b",{children:j(a.activeId)?.name??""}),(0,q.jsx)("span",{children:n.connections.session(a.activeId).version||j(a.activeId)?.engine||""})]}):(0,q.jsx)("span",{className:"dg-status-item",children:e("selectConnection")}),f?(0,q.jsxs)("span",{className:"dg-status-item",children:[(0,q.jsx)("span",{children:f.database}),f.schema?(0,q.jsxs)("span",{children:["\xB7 ",f.schema]}):null]}):null,(0,q.jsx)("div",{className:"dg-spacer"}),Z.length>0?(0,q.jsxs)("span",{className:"dg-status-item",children:[e("boundProject"),": ",Z.length]}):null,(0,q.jsx)("span",{className:"dg-status-item",children:oe?oe.kind:"ready"})]});return(0,q.jsxs)("div",{className:"dg-root",children:[(0,q.jsx)("style",{children:Zt}),me,d.error?(0,q.jsx)(fe,{tone:"error",onClose:()=>{n.meta.load()},children:d.error}):null,(0,q.jsxs)("div",{className:"dg-body",children:[(0,q.jsx)("div",{style:{width:H,flex:`0 0 ${H}px`,display:"flex",minWidth:0},children:(0,q.jsx)(un,{store:n,t:e,selectedDatabaseKey:U,onNewConnection:()=>b({kind:"connection"}),onOpenWorkspaces:()=>b({kind:"workspaces"}),onSelectDatabase:Q,onOpenTable:(s,i,p,C)=>O(s,i.name,p,C),onConnectionMenu:G,onDatabaseMenu:z,onNewQuery:(s,i)=>te(s,i.name)})}),(0,q.jsx)(_t,{width:H,setWidth:L,min:200,max:420}),(0,q.jsxs)("div",{className:"dg-main",children:[ye,o.tabs.length===0?(0,q.jsx)(he,{title:e("selectConnection"),hint:e("agentHint"),children:(0,q.jsxs)("div",{className:"dg-welcome-actions",children:[(0,q.jsxs)(K,{className:"dg-btn-new-conn",onClick:()=>b({kind:"connection"}),children:[(0,q.jsx)(N,{name:"plus",size:11}),e("newConnection")]}),(0,q.jsxs)(K,{variant:"ghost",onClick:()=>b({kind:"workspaces"}),children:[(0,q.jsx)(N,{name:"link",size:11}),e("workspaces")]})]})}):null,le,B?(0,q.jsxs)("div",{className:`dg-toast${B.tone==="error"?" dg-toast-error":""}`,children:[(0,q.jsx)(N,{name:B.tone==="error"?"alert":"check",size:11}),(0,q.jsx)("span",{className:"dg-truncate",children:B.message})]}):null]})]}),x,m&&m.kind==="connection"?(0,q.jsx)(en,{t:e,engines:d.meta?.engines??[],initial:m.initial??null,onClose:()=>b(null),onSave:I}):null,m&&m.kind==="workspaces"?(0,q.jsx)(tn,{t:e,store:n,onClose:()=>b(null),notify:T}):null,y?(0,q.jsx)(Fe,{x:window.innerWidth/2,y:window.innerHeight/2,onClose:()=>A(null),items:[{label:e("confirmDeleteConnection"),disabled:!0},{separator:!0},{label:e("cancel"),onClick:()=>A(null)},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>{let s=y;A(null),n.connections.remove(s.id).catch(i=>T(i instanceof Error?i.message:String(i),"error"))}}]}):null,$?(0,q.jsx)(Fe,{x:$.x,y:$.y,items:$.items,onClose:()=>k(null)}):null]})}var Me=require("react/jsx-runtime"),at="grid",pn="grid";function Jn({size:t=20,active:e}){return(0,Me.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,focusable:"false",children:[(0,Me.jsx)("ellipse",{cx:"12",cy:"5.6",rx:"7.1",ry:"2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Me.jsx)("path",{d:"M4.9 5.6v12.8c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9V5.6",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round"}),(0,Me.jsx)("path",{d:"M4.9 9.9c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Me.jsx)("path",{d:"M4.9 14.2c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Me.jsx)("rect",{x:"10.55",y:"9.55",width:"2.9",height:"10.9",rx:"1.2",fill:"var(--dsw-alias-brand-primary)",opacity:e===!1?.55:.9})]})}function Un(t){t.effect(()=>t.locale.register(at,qt),"grid: dictionaries");let e=t.locale.bind(at);t.slots.inject("main",()=>t.slots.register({name:"main",key:pn,locale:at},mn)),t.slots.inject("sidebar.panellist",()=>t.slots.register({name:"sidebar.panellist",id:pn,order:15,label:()=>e("panel"),locale:at},Jn))}var Xn={inject:["slots","locale"],apply:Un};

    return module.exports.default || module.exports;
  },
});
