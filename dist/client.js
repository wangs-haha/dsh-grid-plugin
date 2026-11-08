window.__ModuleLoader__.load({
  id: '@local/dsh-grid',
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
"use strict";var ut=Object.defineProperty;var Tn=Object.getOwnPropertyDescriptor;var En=Object.getOwnPropertyNames;var zn=Object.prototype.hasOwnProperty;var Rn=(t,e)=>{for(var n in e)ut(t,n,{get:e[n],enumerable:!0})},In=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let d of En(e))!zn.call(t,d)&&d!==n&&ut(t,d,{get:()=>e[d],enumerable:!(i=Tn(e,d))||i.enumerable});return t};var Mn=t=>In(ut({},"__esModule",{value:!0}),t);var Xn={};Rn(Xn,{default:()=>Un});module.exports=Mn(Xn);var Pn={meta:{title:"Grid",description:"Database workbench: connections with groups, colours and TLS modes, a schema browser, an editable data grid, a SQL console with completion, and saved queries \u2014 plus read-only database context for the agent."},panel:"Grid",connections:"Connections",tabGeneral:"General",tabSsh:"SSH Tunnel",tabSsl:"SSL / TLS",connectionOptions:"Organization",nameAutoHint:"Optional \u2014 a name is generated from the host/database or file name.",showPassword:"Show password",hidePassword:"Hide password",colorNone:"No colour",colorGreen:"Green",colorYellow:"Yellow",colorRed:"Red",workspaces:"Workspaces",noWorkspaces:"No workspace is registered in this profile yet.",databases:"Databases",newConnection:"New connection",newQuery:"New query",tables:"Tables",views:"Views",functions:"Functions",users:"Users",queries:"Queries",overview:"Overview",connect:"Connect",disconnect:"Disconnect",test:"Test Connection",edit:"Edit",delete:"Delete",refresh:"Refresh",save:"Save",cancel:"Cancel",close:"Close",closeThisTab:"Close",closeAllTabs:"Close All",closeOtherTabs:"Close Others",closeTabsToRight:"Close to the Right",closeTabsToLeft:"Close to the Left",optional:"optional",required:"required",confirm:"Confirm",apply:"Apply",clear:"Clear",search:"Search\u2026",loading:"Loading\u2026",error:"Error",name:"Name",type:"Type",comment:"Comment",rows:"Rows",estimatedTotal:"The engine estimated this row count; Refresh asks for an exact count.",size:"Size",total:"Total",selectConnection:"Select a connection on the left to begin.",selectDatabase:"Select a database to list its objects.",emptyTables:"No tables or views in this database.",emptyTable:"This table is empty.",emptyResult:"The query returned no rows.",emptyObjects:"Nothing here yet.",data:"Data",structure:"Structure",columns:"Columns",indexes:"Indexes",ddl:"DDL",noIndexes:"No indexes.",nullable:"Nullable",default:"Default",primaryKey:"PK",insertRow:"Insert row",editRow:"Edit row",rowSaved:"Row saved",rowInserted:"Row inserted",insertRowFailed:"The row could not be inserted with its defaults.",deleteRow:"Delete row",confirmDelete:"Delete this row?",confirmDeleteConnection:"Delete this connection? Its saved password is removed too.",confirmDeleteKey:"Delete this key?",noPrimaryKey:"This table has no primary key, so rows cannot be located safely. Editing is disabled.",cellSaved:"Saved",deleted:"Deleted",saved:"Saved",copied:"Copied",page:"Page {page} of {pages}",pageSize:"Rows per page",prev:"Previous",next:"Next",selection:"Selection {n}",sum:"Sum",avg:"Avg",count:"Count",exportCsv:"Export CSV",exportJson:"Export JSON",exportInsert:"Export INSERT statements",exportMarkdown:"Export Markdown table",exportAs:"Export",importCsv:"Import CSV",importDone:"Imported {n} row(s)",importEmpty:"That file has no rows.",importNoColumns:"Open the table first so its column names are known.",importUnknownColumns:"The file has columns this table does not: {cols}",importFailed:"Imported {n} row(s), then stopped: {error}",exportTruncated:"Export limited to {n} rows",filter:"Filter",filterBuilder:"Filter builder",rawWhere:"Raw WHERE",addCondition:"Add condition",matchAll:"Match all",matchAny:"Match any",columnChooser:"Columns",showAll:"Show all",resetWidths:"Reset widths",run:"Run",cancelQuery:"Cancel",queryCancelled:"Cancelled",cancelUnsupported:"This engine cannot cancel a running statement.",runHint:"Ctrl/Cmd + Enter to run",explain:"Explain",beautify:"Beautify",history:"History",noHistory:"No queries yet.",result:"Result {n}",statementCount:"{n} statement(s)",queryOk:"{n} row(s) in {ms} ms",resultTruncated:"The result was capped: only the first 2 000 rows are shown.",queryFailed:"Failed after {ms} ms",affected:"{n} row(s) affected",noStatements:"Nothing to run.",completionHint:"Ctrl + Space for completion",readOnlyHint:"Read-only statements only",redisKeys:"Keys",redisPattern:"Pattern",redisType:"Type",scanMore:"Scan more",ttl:"TTL",noTtl:"no expiry",keyValue:"Value",command:"Command",commandHint:"e.g. GET user:1",reply:"Reply",deleteKey:"Delete key",newKey:"New key",setTtl:"Set TTL",rename:"Rename",editValue:"Edit value",saveQuery:"Save query",queryName:"Query name",querySaved:"Query saved",noQueries:"No saved queries yet. Save one from the SQL console, or ask the agent to.",openInEditor:"Open in editor",runQuery:"Run",source:"Source",bindProject:"Bind to this project",unbindProject:"Unbind project",projectBound:"This conversation can read {name} ({database}) without asking.",projectUnbound:"Not bound to this workspace. The agent has to ask which connection to use.",readOnlyForAgent:"Agent access is read-only",agentHint:"The agent can list, inspect and query these connections with grid_* tools, and save queries for you.",functionKind:"Function",procedureKind:"Procedure",returnType:"Returns",language:"Language",definition:"Definition",noRoutines:"No functions or procedures.",accountName:"User",accountHost:"Host",accountPlugin:"Plugin",accountLocked:"Locked",accountPrivileged:"Privileged",noAccounts:"No accounts are visible to this connection.",driverMissing:"The {engine} driver is not installed. Run `pnpm add {pkg}` in the plugin directory.",engineUnavailable:"Unavailable",testOk:"Connection works \xB7 {version} \xB7 {ms} ms",testFailed:"Connection failed: {error}",passwordKeep:"Leave blank to keep the saved password",secretKeep:"Saved credential exists. Leave blank to keep it; use Clear credential to remove it.",secretClear:"Clear credential",secretUndoClear:"Undo clear",secretClearPending:"This credential will be cleared on save. Typing a replacement cancels the clear.",sshSection:"SSH tunnel",sshEnable:"Connect through SSH",sshSingleHopHint:"Single jump host only. All SSH server fields and a pinned fingerprint are required.",sshHost:"SSH host",sshPort:"SSH port",sshUsername:"SSH user",sshAuthType:"SSH authentication",sshAuthPassword:"Password",sshAuthPrivateKey:"Private key",sshHostFingerprint:"Pinned SSH host fingerprint",sshFingerprintHint:"Obtain the SHA256:\u2026 host fingerprint from your administrator through a trusted channel. It is never discovered or trusted automatically.",sshPassword:"SSH password",sshPrivateKey:"SSH private key",sshPrivateKeyHint:"Paste the complete private key. Saved private keys are never read back; no host file path is read.",sshPassphrase:"Private key passphrase (optional)",sshDatabaseHostHint:"Database host is resolved from the SSH jump host. 127.0.0.1 means the jump host itself.",sshSecurityHint:"SSH does not replace database TLS. Keep database TLS enabled when required and use the database server name for certificate verification.",sshDisableHint:"Saving with SSH off removes the saved tunnel settings and SSH credentials.",sshFieldsRequired:"SSH host, user, authentication method and a pinned SHA256 host fingerprint are required.",sshPortInvalid:"SSH port must be a whole number from 1 to 65535.",sshFingerprintInvalid:"Enter a pinned SHA256 host fingerprint (SHA256: followed by 43 base64 characters, optionally ending in =).",tlsServerName:"TLS server name",tlsServerNameHint:"Leave blank to use the database host. This is the database certificate name, not the SSH host or a local forwarding address.",sqlserverVerifyCaUnsupported:"SQL Server cannot verify the certificate chain without host-name verification. Choose full verification or another supported TLS mode.",engine:"Engine",host:"Host",port:"Port",user:"User",password:"Password",database:"Database",schema:"Schema",file:"Database file",redisDb:"Database index",color:"Environment colour",identity:"Identity",group:"Group",sslDisable:"TLS off",sslRequire:"TLS, certificate not verified",sslVerifyCa:"TLS, verify certificate chain",sslVerifyFull:"TLS, verify certificate and host name",connectionLost:"Connection lost \u2014 reconnect failed.",bannerTools:"The agent can inspect and query these connections.",writesEnabled:"Writes enabled for the agent",writesDisabled:"Read-only for the agent",unsaved:"Unsaved",copyName:"Copy name",openInQuery:"Open in query",tablesCount:"{n} table(s)",viewsCount:"{n} view(s)",routinesCount:"{n} routine(s)",server:"Server",updatedAt:"Updated",version:"Version",boundProject:"Project",noGroups:"Ungrouped"},$n={meta:{title:"Grid \u6570\u636E\u5E93",description:"\u6570\u636E\u5E93\u5DE5\u4F5C\u53F0\uFF1A\u8FDE\u63A5\uFF08\u5206\u7EC4+\u73AF\u5883\u8272\uFF09\u3001\u5E93\u8868\u6D4F\u89C8\u3001\u53EF\u7F16\u8F91\u6570\u636E\u7F51\u683C\u3001\u5E26\u8865\u5168\u7684 SQL \u63A7\u5236\u53F0\u3001\u67E5\u8BE2\u4FDD\u5B58\u4E0E\u5907\u4EFD\uFF0C\u5E76\u5411 Agent \u63D0\u4F9B\u53EA\u8BFB\u5E93\u4E0A\u4E0B\u6587\u3002"},panel:"\u6570\u636E\u5E93",connections:"\u8FDE\u63A5",tabGeneral:"\u5E38\u89C4",tabSsh:"SSH \u96A7\u9053",tabSsl:"SSL / TLS",connectionOptions:"\u5206\u7EC4\u4E0E\u6807\u8BB0",nameAutoHint:"\u9009\u586B\uFF0C\u7559\u7A7A\u6309\u4E3B\u673A\u3001\u6570\u636E\u5E93\u6216\u6587\u4EF6\u540D\u81EA\u52A8\u547D\u540D\u3002",showPassword:"\u663E\u793A\u5BC6\u7801",hidePassword:"\u9690\u85CF\u5BC6\u7801",colorNone:"\u65E0\u6807\u8BB0",colorGreen:"\u7EFF\u8272",colorYellow:"\u9EC4\u8272",colorRed:"\u7EA2\u8272",workspaces:"\u5DE5\u4F5C\u533A",noWorkspaces:"\u8FD9\u4E2A profile \u91CC\u8FD8\u6CA1\u6709\u6CE8\u518C\u5DE5\u4F5C\u533A\u3002",databases:"\u6570\u636E\u5E93",newConnection:"\u65B0\u5EFA\u8FDE\u63A5",newQuery:"\u65B0\u5EFA\u67E5\u8BE2",tables:"\u8868",views:"\u89C6\u56FE",functions:"\u51FD\u6570",users:"\u7528\u6237",queries:"\u67E5\u8BE2",overview:"\u6982\u89C8",connect:"\u8FDE\u63A5",disconnect:"\u65AD\u5F00",test:"\u6D4B\u8BD5\u8FDE\u63A5",edit:"\u7F16\u8F91",delete:"\u5220\u9664",refresh:"\u5237\u65B0",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",closeThisTab:"\u5173\u95ED\u6B64\u6807\u7B7E",closeAllTabs:"\u5173\u95ED\u5168\u90E8\u6807\u7B7E",closeOtherTabs:"\u5173\u95ED\u5176\u4ED6\u6807\u7B7E",closeTabsToRight:"\u5173\u95ED\u53F3\u4FA7\u6807\u7B7E",closeTabsToLeft:"\u5173\u95ED\u5DE6\u4FA7\u6807\u7B7E",optional:"\u9009\u586B",required:"\u5FC5\u586B",confirm:"\u786E\u5B9A",apply:"\u5E94\u7528",clear:"\u6E05\u7A7A",search:"\u641C\u7D22\u2026",loading:"\u52A0\u8F7D\u4E2D\u2026",error:"\u9519\u8BEF",name:"\u540D\u79F0",type:"\u7C7B\u578B",comment:"\u6CE8\u91CA",rows:"\u884C\u6570",estimatedTotal:"\u8BE5\u884C\u6570\u6765\u81EA\u5F15\u64CE\u4F30\u7B97\uFF1B\u70B9\u5237\u65B0\u53EF\u83B7\u53D6\u7CBE\u786E\u503C\u3002",size:"\u5927\u5C0F",total:"\u5408\u8BA1",selectConnection:"\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u8FDE\u63A5\u5F00\u59CB\u3002",selectDatabase:"\u9009\u62E9\u4E00\u4E2A\u6570\u636E\u5E93\u6765\u5217\u51FA\u5B83\u7684\u5BF9\u8C61\u3002",emptyTables:"\u8FD9\u4E2A\u6570\u636E\u5E93\u91CC\u6CA1\u6709\u8868\u6216\u89C6\u56FE\u3002",emptyTable:"\u8FD9\u5F20\u8868\u8FD8\u6CA1\u6709\u6570\u636E\u3002",emptyResult:"\u67E5\u8BE2\u6CA1\u6709\u8FD4\u56DE\u4EFB\u4F55\u884C\u3002",emptyObjects:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u5185\u5BB9\u3002",data:"\u6570\u636E",structure:"\u7ED3\u6784",columns:"\u5B57\u6BB5",indexes:"\u7D22\u5F15",ddl:"DDL",noIndexes:"\u6CA1\u6709\u7D22\u5F15\u3002",nullable:"\u53EF\u7A7A",default:"\u9ED8\u8BA4\u503C",primaryKey:"\u4E3B\u952E",insertRow:"\u63D2\u5165\u884C",editRow:"\u7F16\u8F91\u884C",rowSaved:"\u884C\u5DF2\u4FDD\u5B58",rowInserted:"\u5DF2\u63D2\u5165\u4E00\u884C",insertRowFailed:"\u65E0\u6CD5\u7528\u9ED8\u8BA4\u503C\u63D2\u5165\u65B0\u884C\u3002",deleteRow:"\u5220\u9664\u884C",confirmDelete:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E00\u884C\uFF1F",confirmDeleteConnection:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8FDE\u63A5\uFF1F\u4FDD\u5B58\u7684\u5BC6\u7801\u4E5F\u4F1A\u4E00\u5E76\u5220\u9664\u3002",confirmDeleteKey:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u952E\uFF1F",noPrimaryKey:"\u8BE5\u8868\u6CA1\u6709\u4E3B\u952E\uFF0C\u65E0\u6CD5\u5B89\u5168\u5B9A\u4F4D\u884C\uFF0C\u7F16\u8F91\u5DF2\u7981\u7528\u3002",cellSaved:"\u5DF2\u4FDD\u5B58",deleted:"\u5DF2\u5220\u9664",saved:"\u5DF2\u4FDD\u5B58",copied:"\u5DF2\u590D\u5236",page:"\u7B2C {page} / {pages} \u9875",pageSize:"\u6BCF\u9875\u884C\u6570",prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875",selection:"\u9009\u533A {n}",sum:"\u5408\u8BA1",avg:"\u5E73\u5747",count:"\u8BA1\u6570",exportCsv:"\u5BFC\u51FA CSV",exportJson:"\u5BFC\u51FA JSON",exportInsert:"\u5BFC\u51FA INSERT \u8BED\u53E5",exportMarkdown:"\u5BFC\u51FA Markdown \u8868\u683C",exportAs:"\u5BFC\u51FA",importCsv:"\u5BFC\u5165 CSV",importDone:"\u5DF2\u5BFC\u5165 {n} \u884C",importEmpty:"\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u6570\u636E\u884C\u3002",importNoColumns:"\u8BF7\u5148\u6253\u5F00\u8BE5\u8868\uFF0C\u4EE5\u4FBF\u77E5\u9053\u5217\u540D\u3002",importUnknownColumns:"\u6587\u4EF6\u91CC\u6709\u672C\u8868\u4E0D\u5B58\u5728\u7684\u5217\uFF1A{cols}",importFailed:"\u5DF2\u5BFC\u5165 {n} \u884C\uFF0C\u968F\u540E\u4E2D\u65AD\uFF1A{error}",exportTruncated:"\u5BFC\u51FA\u4E0A\u9650\u4E3A {n} \u884C",filter:"\u7B5B\u9009",filterBuilder:"\u7B5B\u9009\u6784\u5EFA\u5668",rawWhere:"\u539F\u59CB WHERE",addCondition:"\u6DFB\u52A0\u6761\u4EF6",matchAll:"\u5168\u90E8\u6EE1\u8DB3",matchAny:"\u4EFB\u4E00\u6EE1\u8DB3",columnChooser:"\u5B57\u6BB5\u663E\u793A",showAll:"\u5168\u90E8\u663E\u793A",resetWidths:"\u91CD\u7F6E\u5217\u5BBD",run:"\u6267\u884C",cancelQuery:"\u53D6\u6D88\u6267\u884C",queryCancelled:"\u5DF2\u53D6\u6D88",cancelUnsupported:"\u8BE5\u5F15\u64CE\u65E0\u6CD5\u53D6\u6D88\u6B63\u5728\u6267\u884C\u7684\u8BED\u53E5\u3002",runHint:"Ctrl/Cmd + Enter \u6267\u884C",explain:"\u89E3\u91CA",beautify:"\u7F8E\u5316",history:"\u5386\u53F2",noHistory:"\u8FD8\u6CA1\u6709\u6267\u884C\u8FC7\u67E5\u8BE2\u3002",result:"\u7ED3\u679C {n}",statementCount:"{n} \u6761\u8BED\u53E5",queryOk:"{n} \u884C\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",resultTruncated:"\u7ED3\u679C\u5DF2\u622A\u65AD\uFF1A\u53EA\u663E\u793A\u524D 2 000 \u884C\u3002",queryFailed:"\u5931\u8D25\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",affected:"\u5F71\u54CD {n} \u884C",noStatements:"\u6CA1\u6709\u53EF\u6267\u884C\u7684\u5185\u5BB9\u3002",completionHint:"Ctrl + Space \u5524\u8D77\u8865\u5168",readOnlyHint:"\u4EC5\u53EA\u8BFB\u8BED\u53E5",redisKeys:"\u952E",redisPattern:"\u5339\u914D\u6A21\u5F0F",redisType:"\u7C7B\u578B",scanMore:"\u7EE7\u7EED\u626B\u63CF",ttl:"\u5269\u4F59\u65F6\u95F4",noTtl:"\u6C38\u4E0D\u8FC7\u671F",keyValue:"\u503C",command:"\u547D\u4EE4",commandHint:"\u4F8B\u5982 GET user:1",reply:"\u8FD4\u56DE",deleteKey:"\u5220\u9664\u952E",newKey:"\u65B0\u5EFA\u952E",setTtl:"\u8BBE\u7F6E TTL",rename:"\u91CD\u547D\u540D",editValue:"\u7F16\u8F91\u503C",saveQuery:"\u4FDD\u5B58\u67E5\u8BE2",queryName:"\u67E5\u8BE2\u540D\u79F0",querySaved:"\u67E5\u8BE2\u5DF2\u4FDD\u5B58",noQueries:"\u8FD8\u6CA1\u6709\u4FDD\u5B58\u7684\u67E5\u8BE2\u3002\u53EF\u4EE5\u5728 SQL \u63A7\u5236\u53F0\u91CC\u4FDD\u5B58\uFF0C\u4E5F\u53EF\u4EE5\u8BA9 Agent \u5E2E\u4F60\u4FDD\u5B58\u3002",openInEditor:"\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00",runQuery:"\u6267\u884C",source:"\u6765\u6E90",bindProject:"\u7ED1\u5B9A\u5230\u5F53\u524D\u9879\u76EE",unbindProject:"\u89E3\u9664\u9879\u76EE\u7ED1\u5B9A",projectBound:"\u672C\u6B21\u5BF9\u8BDD\u53EF\u4EE5\u76F4\u63A5\u8BFB\u53D6 {name}\uFF08{database}\uFF09\uFF0C\u65E0\u9700\u53CD\u590D\u786E\u8BA4\u3002",projectUnbound:"\u5C1A\u672A\u7ED1\u5B9A\u5230\u5F53\u524D\u5DE5\u4F5C\u533A\uFF0CAgent \u9700\u8981\u5148\u8BE2\u95EE\u4F7F\u7528\u54EA\u4E2A\u8FDE\u63A5\u3002",readOnlyForAgent:"Agent \u8BBF\u95EE\u4E3A\u53EA\u8BFB",agentHint:"Agent \u53EF\u4EE5\u901A\u8FC7 grid_* \u5DE5\u5177\u5217\u51FA\u3001\u68C0\u67E5\u3001\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\uFF0C\u4E5F\u80FD\u66FF\u4F60\u4FDD\u5B58\u67E5\u8BE2\u3002",functionKind:"\u51FD\u6570",procedureKind:"\u5B58\u50A8\u8FC7\u7A0B",returnType:"\u8FD4\u56DE\u7C7B\u578B",language:"\u8BED\u8A00",definition:"\u5B9A\u4E49",noRoutines:"\u6CA1\u6709\u51FD\u6570\u6216\u5B58\u50A8\u8FC7\u7A0B\u3002",accountName:"\u7528\u6237",accountHost:"\u4E3B\u673A",accountPlugin:"\u8BA4\u8BC1\u63D2\u4EF6",accountLocked:"\u5DF2\u9501\u5B9A",accountPrivileged:"\u7279\u6743",noAccounts:"\u8BE5\u8FDE\u63A5\u770B\u4E0D\u5230\u7528\u6237\u5217\u8868\u3002",driverMissing:"\u672A\u5B89\u88C5 {engine} \u9A71\u52A8\uFF0C\u8BF7\u5728\u63D2\u4EF6\u76EE\u5F55\u6267\u884C `pnpm add {pkg}`\u3002",engineUnavailable:"\u4E0D\u53EF\u7528",testOk:"\u8FDE\u63A5\u6210\u529F \xB7 {version} \xB7 {ms} \u6BEB\u79D2",testFailed:"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}",passwordKeep:"\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u5DF2\u4FDD\u5B58\u7684\u5BC6\u7801",secretKeep:"\u5DF2\u6709\u4FDD\u5B58\u7684\u51ED\u636E\uFF1B\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u3002\u4EC5\u70B9\u51FB\u300C\u6E05\u7A7A\u51ED\u636E\u300D\u624D\u4F1A\u79FB\u9664\u3002",secretClear:"\u6E05\u7A7A\u51ED\u636E",secretUndoClear:"\u64A4\u9500\u6E05\u7A7A",secretClearPending:"\u4FDD\u5B58\u65F6\u5C06\u6E05\u7A7A\u6B64\u51ED\u636E\uFF1B\u8F93\u5165\u65B0\u503C\u4F1A\u53D6\u6D88\u6E05\u7A7A\u3002",sshSection:"SSH \u96A7\u9053",sshEnable:"\u901A\u8FC7 SSH \u8FDE\u63A5",sshSingleHopHint:"\u4EC5\u652F\u6301\u5355\u8DF3\uFF1BSSH \u670D\u52A1\u5668\u4FE1\u606F\u4E0E\u56FA\u5B9A\u4E3B\u673A\u6307\u7EB9\u5747\u4E3A\u5FC5\u586B\u9879\u3002",sshHost:"SSH \u4E3B\u673A",sshPort:"SSH \u7AEF\u53E3",sshUsername:"SSH \u7528\u6237\u540D",sshAuthType:"SSH \u8BA4\u8BC1\u65B9\u5F0F",sshAuthPassword:"\u5BC6\u7801",sshAuthPrivateKey:"\u79C1\u94A5",sshHostFingerprint:"\u56FA\u5B9A SSH \u4E3B\u673A\u6307\u7EB9",sshFingerprintHint:"\u8BF7\u901A\u8FC7\u7BA1\u7406\u5458\u7684\u53EF\u4FE1\u6E20\u9053\u83B7\u53D6 SHA256:\u2026 \u4E3B\u673A\u6307\u7EB9\uFF1B\u4E0D\u4F1A\u81EA\u52A8\u63A2\u6D4B\u6216\u4FE1\u4EFB\u6307\u7EB9\u3002",sshPassword:"SSH \u5BC6\u7801",sshPrivateKey:"SSH \u79C1\u94A5",sshPrivateKeyHint:"\u7C98\u8D34\u5B8C\u6574\u79C1\u94A5\u3002\u5DF2\u4FDD\u5B58\u7684\u79C1\u94A5\u4E0D\u4F1A\u56DE\u8BFB\uFF0C\u4E5F\u4E0D\u4F1A\u8BFB\u53D6\u4E3B\u673A\u4E0A\u7684\u4EFB\u610F\u8DEF\u5F84\u6587\u4EF6\u3002",sshPassphrase:"\u79C1\u94A5\u53E3\u4EE4\uFF08\u53EF\u9009\uFF09",sshDatabaseHostHint:"\u6570\u636E\u5E93\u4E3B\u673A\u4EE5 SSH \u8DF3\u677F\u673A\u7684\u89C6\u89D2\u89E3\u6790\uFF1B127.0.0.1 \u6307\u8DF3\u677F\u673A\u672C\u673A\u3002",sshSecurityHint:"SSH \u4E0D\u4EE3\u66FF\u6570\u636E\u5E93 TLS\u3002\u9700\u8981\u65F6\u4ECD\u5E94\u542F\u7528\u6570\u636E\u5E93 TLS\uFF0C\u5E76\u4F7F\u7528\u6570\u636E\u5E93\u670D\u52A1\u5668\u540D\u6821\u9A8C\u8BC1\u4E66\u3002",sshDisableHint:"\u5173\u95ED SSH \u540E\u4FDD\u5B58\u4F1A\u79FB\u9664\u5DF2\u4FDD\u5B58\u7684\u96A7\u9053\u8BBE\u7F6E\u548C SSH \u51ED\u636E\u3002",sshFieldsRequired:"\u8BF7\u586B\u5199 SSH \u4E3B\u673A\u3001\u7528\u6237\u540D\u3001\u8BA4\u8BC1\u65B9\u5F0F\u53CA\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\u3002",sshPortInvalid:"SSH \u7AEF\u53E3\u5FC5\u987B\u662F 1 \u81F3 65535 \u7684\u6574\u6570\u3002",sshFingerprintInvalid:"\u8BF7\u8F93\u5165\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\uFF08SHA256: \u540E\u8DDF 43 \u4E2A base64 \u5B57\u7B26\uFF0C\u53EF\u5E26\u672B\u5C3E =\uFF09\u3002",tlsServerName:"TLS \u670D\u52A1\u5668\u540D",tlsServerNameHint:"\u7559\u7A7A\u9ED8\u8BA4\u4F7F\u7528\u6570\u636E\u5E93\u4E3B\u673A\u3002\u586B\u5199\u6570\u636E\u5E93\u8BC1\u4E66\u4E0A\u7684\u670D\u52A1\u5668\u540D\uFF0C\u800C\u4E0D\u662F SSH \u4E3B\u673A\u6216\u672C\u5730\u8F6C\u53D1\u5730\u5740\u3002",sqlserverVerifyCaUnsupported:"SQL Server \u4E0D\u652F\u6301\u4EC5\u6821\u9A8C\u8BC1\u4E66\u94FE\u800C\u4E0D\u6821\u9A8C\u4E3B\u673A\u540D\uFF1B\u8BF7\u9009\u62E9\u5B8C\u6574\u6821\u9A8C\u6216\u5176\u4ED6\u652F\u6301\u7684 TLS \u6A21\u5F0F\u3002",engine:"\u5F15\u64CE",host:"\u4E3B\u673A",port:"\u7AEF\u53E3",user:"\u7528\u6237\u540D",password:"\u5BC6\u7801",database:"\u6570\u636E\u5E93",schema:"Schema",file:"\u6570\u636E\u5E93\u6587\u4EF6",redisDb:"\u5E93\u5E8F\u53F7",color:"\u73AF\u5883\u8272",identity:"\u6807\u8BC6",group:"\u5206\u7EC4",sslDisable:"\u5173\u95ED TLS",sslRequire:"TLS\uFF0C\u4E0D\u6821\u9A8C\u8BC1\u4E66",sslVerifyCa:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u94FE",sslVerifyFull:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u4E0E\u4E3B\u673A\u540D",connectionLost:"\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u91CD\u8FDE\u5931\u8D25\u3002",bannerTools:"Agent \u53EF\u4EE5\u68C0\u67E5\u5E76\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\u3002",writesEnabled:"Agent \u53EF\u5199",writesDisabled:"Agent \u53EA\u8BFB",unsaved:"\u672A\u4FDD\u5B58",copyName:"\u590D\u5236\u540D\u79F0",openInQuery:"\u5728\u67E5\u8BE2\u4E2D\u6253\u5F00",tablesCount:"{n} \u5F20\u8868",viewsCount:"{n} \u4E2A\u89C6\u56FE",routinesCount:"{n} \u4E2A\u4F8B\u7A0B",server:"\u670D\u52A1\u5668",updatedAt:"\u66F4\u65B0\u65F6\u95F4",version:"\u7248\u672C",boundProject:"\u9879\u76EE",noGroups:"\u672A\u5206\u7EC4"},qt={en:Pn,zh:$n};var Ce=require("react");var mt=new Set("select from where group by order having limit offset join inner left right full outer cross on as and or not in is null like ilike between exists case when then else end union all distinct insert into values update set delete create table view index alter add drop truncate primary key foreign references unique default constraint cascade returning with recursive asc desc explain analyze show describe use begin commit rollback transaction if temporary materialized over partition window rows range current row unbounded preceding following fetch next only for share nowait".split(/\s+/)),ft=new Set("count sum avg min max coalesce nullif cast convert round floor ceil abs length lower upper trim ltrim rtrim substr substring replace concat concat_ws now current_timestamp current_date current_time date_trunc extract date_part to_char to_date row_number rank dense_rank ntile lag lead first_value last_value json_extract array_agg string_agg group_concat ifnull greatest least random uuid gen_random_uuid".split(/\s+/)),At=["SELECT","FROM","WHERE","GROUP BY","ORDER BY","HAVING","LIMIT","OFFSET","UNION ALL","UNION","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","RETURNING","LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN","JOIN"];function bt(t){let e=String(t??""),n=[],i=0,d=(r,p)=>{if(!p)return;let g=n[n.length-1];g&&g.type===r?g.value+=p:n.push({type:r,value:p})};for(;i<e.length;){let r=e[i],p=e.slice(i);if(r==="-"&&e[i+1]==="-"){let g=e.indexOf(`
`,i),f=g===-1?e.length:g;d("comment",e.slice(i,f)),i=f;continue}if(r==="/"&&e[i+1]==="*"){let g=e.indexOf("*/",i+2),f=g===-1?e.length:g+2;d("comment",e.slice(i,f)),i=f;continue}if(r==="'"||r==='"'||r==="`"){let g=i+1;for(;g<e.length;){if(e[g]==="\\"){g+=2;continue}if(e[g]===r){if(e[g+1]===r){g+=2;continue}g+=1;break}g+=1}d(r==="'"?"string":"ident",e.slice(i,g)),i=g;continue}if(r==="$"&&/^\$[A-Za-z_]*\$/.test(p)){let g=/^\$[A-Za-z_]*\$/.exec(p)[0],f=e.indexOf(g,i+g.length),v=f===-1?e.length:f+g.length;d("string",e.slice(i,v)),i=v;continue}if(/[0-9]/.test(r)||r==="."&&/[0-9]/.test(e[i+1]??"")){let g=/^[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/.exec(p);d("number",g?g[0]:r),i+=g?g[0].length:1;continue}if(/[A-Za-z_@:]/.test(r)){let f=/^[A-Za-z_@:][A-Za-z0-9_$@:]*/.exec(p)[0],v=f.toLowerCase(),x=e[i+f.length];r==="@"||r===":"?d("variable",f):mt.has(v)?d("keyword",f):x==="("||ft.has(v)?d("function",f):d("plain",f),i+=f.length;continue}if(/[(),;]/.test(r)){d("punct",r),i+=1;continue}if(/[=<>!+\-*/%|]/.test(r)){let g=/^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/.exec(p);d("operator",g?g[0]:r),i+=g?g[0].length:1;continue}d("ws",r),i+=1}return n}function Lt(t){let e=String(t??"").trim();if(!e)return"";let n=bt(e),i=[],d="",r=0,p=()=>{let g=d.trim();g&&i.push(g),d=""};for(let g=0;g<n.length;g+=1){let f=n[g];if(f.type==="ws"){d!==""&&!d.endsWith(" ")&&(d+=" ");continue}if(f.type==="comment"){p(),i.push(f.value.trim());continue}if(f.type==="punct"){f.value==="("&&(r+=1),f.value===")"&&(r=Math.max(0,r-1)),d+=f.value;continue}if(f.type==="keyword"){let v=f.value.toUpperCase(),x=n[g+1],B=n[g+2];if(x&&x.type==="ws"&&B&&B.type==="keyword"){let T=`${v} ${B.value.toUpperCase()}`;At.includes(T)&&(v=T,g+=2)}if(r===0&&At.includes(v)){p(),d=`${v} `;continue}d+=`${v} `;continue}d+=f.value}return p(),i.length<2?e:i.join(`
  `).replace(/[ \t]+$/gm,"")}function Ke(t,e){let n=String(e??"");return t==="mysql"?"`"+n.replace(/`/g,"``")+"`":t==="sqlserver"?"["+n.replace(/]/g,"]]")+"]":'"'+n.replace(/"/g,'""')+'"'}function pt(t){let e=String(t??"").trim();return e===""?"''":/^-?\d+(\.\d+)?$/.test(e)?e:/^(null|true|false)$/i.test(e)?e.toUpperCase():`'${e.replace(/'/g,"''")}'`}var Ht=["=","<>",">",">=","<","<=","LIKE","NOT LIKE","IN","BETWEEN","IS NULL","IS NOT NULL"];function vt(t,e){let n=[];for(let i of e.conditions){if(!i.column)continue;let d=Ke(t,i.column),r=i.op;if(r==="IS NULL"||r==="IS NOT NULL"){n.push(`${d} ${r}`);continue}let p=String(i.value??"");if(p!==""){if(r==="IN"){let g=p.split(",").map(pt).filter(Boolean);if(g.length===0)continue;n.push(`${d} IN (${g.join(", ")})`);continue}if(r==="BETWEEN"){let g=p.split(",").map(pt);if(g.length<2)continue;n.push(`${d} BETWEEN ${g[0]} AND ${g[1]}`);continue}n.push(`${d} ${r} ${pt(p)}`)}}return n.join(` ${e.joiner} `)}function Bt(t,e){let n=document.createElement("div"),i=window.getComputedStyle(t),d=["fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","padding","border","whiteSpace","wordWrap","tabSize"];for(let f of d)n.style[f]=i[f];n.style.position="absolute",n.style.visibility="hidden",n.style.width=`${t.clientWidth}px`,n.style.whiteSpace="pre-wrap",n.style.overflowWrap="break-word",n.textContent=t.value.slice(0,e);let r=document.createElement("span");r.textContent="\u200B",n.appendChild(r),document.body.appendChild(n);let p=r.offsetLeft-t.scrollLeft,g=r.offsetTop-t.scrollTop;return document.body.removeChild(n),{left:Math.max(0,p),top:g}}function me(t,e){return String(t).replace(/\{(\w+)\}/g,(n,i)=>e&&e[i]!==void 0?String(e[i]):n)}function _e(t,e,n=300){if(t==null)return{text:e,isNull:!0,numeric:!1};if(typeof t=="object")try{let d=JSON.stringify(t);return{text:d.length>n?`${d.slice(0,n)}\u2026`:d,isNull:!1,numeric:!1}}catch{return{text:String(t),isNull:!1,numeric:!1}}let i=String(t);return{text:i.length>n?`${i.slice(0,n)}\u2026`:i,isNull:!1,numeric:typeof t=="number"}}function Ge(t){if(t==null)return"";let e=typeof t=="object"?JSON.stringify(t):String(t);return/[",\n\r]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Ot(t){return String(t||"table").replace(/[^\w.-]+/g,"_").slice(0,60)}function Je(t,e,n){let i=new Blob([n],{type:`${e};charset=utf-8`}),d=URL.createObjectURL(i),r=document.createElement("a");r.href=d,r.download=t,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(d),1e3)}function Dn(t,e){return t==null?"NULL":typeof t=="number"?Number.isFinite(t)?String(t):"NULL":typeof t=="boolean"?e==="sqlserver"?t?"1":"0":t?"TRUE":"FALSE":`'${(typeof t=="object"?JSON.stringify(t):String(t)).replace(/'/g,"''")}'`}function Kt(t,e,n,i){let r=[e.database,...t==="postgres"||t==="sqlserver"?[e.schema]:[],e.table].filter(Boolean).map(g=>Ke(t,g)).join("."),p=n.map(g=>Ke(t,g.name)).join(", ");return i.map(g=>`INSERT INTO ${r} (${p}) VALUES (${n.map(f=>Dn(g[f.name],t)).join(", ")});`).join(`
`)}function Ft(t,e){let n=p=>p==null?"":(typeof p=="object"?JSON.stringify(p):String(p)).replace(/\|/g,"\\|").replace(/\r?\n/g," "),i=`| ${t.map(p=>n(p.name)).join(" | ")} |`,d=`| ${t.map(()=>"---").join(" | ")} |`,r=e.map(p=>`| ${t.map(g=>n(p[g.name])).join(" | ")} |`);return[i,d,...r].join(`
`)}function jt(t){let e=String(t??"").replace(/^\uFEFF/,""),n=[],i=[],d=[],r="",p=!1,g=1,f=1,v=0,x=()=>{d.push(r),r=""},B=()=>{x(),(d.length>1||d[0]!=="")&&n.push(d),d=[]};for(;v<e.length;){let H=e[v];if(p){if(H==='"'){if(e[v+1]==='"'){r+='"',v+=2;continue}p=!1,v+=1;continue}(H===`
`||H==="\r")&&(f+=1),r+=H,v+=1;continue}if(H==='"'&&r===""){p=!0,g=f,v+=1;continue}if(H===","){x(),v+=1;continue}if(H==="\r"){v+=e[v+1]===`
`?2:1,f+=1,B();continue}if(H===`
`){v+=1,f+=1,B();continue}r+=H,v+=1}(r!==""||d.length>0)&&B(),p&&i.push(`the quoted field starting on line ${g} is not closed`);let[T=[],...S]=n,I=T.length;I===0&&i.push("the file has no header row");let $=new Set;return T.forEach((H,q)=>{let z=H.trim();z||i.push(`header field ${q+1} is empty`),$.has(z)&&i.push(`header "${z}" appears more than once`),$.add(z)}),S.forEach((H,q)=>{H.length>I&&i.push(`row ${q+2} has ${H.length} fields but the header has ${I}`)}),{header:T.map(H=>H.trim()),rows:S.map(H=>{let q=H.slice(0,I);for(;q.length<I;)q.push("");return q}),errors:i}}function Qt(t){if(!Number.isFinite(t)||t<=0)return"0 B";let e=["B","KB","MB","GB"],n=t,i=0;for(;n>=1024&&i<e.length-1;)n/=1024,i+=1;return`${n.toFixed(i===0?0:1)} ${e[i]}`}function Vt(t){let e=Date.parse(t);if(Number.isNaN(e))return"";let n=Math.max(1,Math.round((Date.now()-e)/1e3));return n<60?`${n}s`:n<3600?`${Math.round(n/60)}m`:n<86400?`${Math.round(n/3600)}h`:`${Math.round(n/86400)}d`}var Ut=require("react");var Ye=class extends Error{constructor(n,i){super(n);this.status=i;this.name="ApiError"}},qn="api/grid",ht=class{constructor(e=qn){this.path=e}async call(e,n={},i){let d;try{d=await fetch(this.path,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:e,...n}),...i?{signal:i}:{}})}catch(g){throw g instanceof DOMException&&g.name==="AbortError"?g:new Ye(g instanceof Error?g.message:String(g),0)}let r=null;try{r=await d.json()}catch{r=null}let p=r&&typeof r=="object"?r:{};if(!d.ok||p.error)throw new Ye(String(p.error??`request failed (${d.status})`),d.status);return p}meta(){return this.call("meta")}listConnections(){return this.call("connections.list")}createConnection(e){return this.call("connections.create",{connection:e})}updateConnection(e,n){return this.call("connections.update",{id:e,patch:n})}deleteConnection(e){return this.call("connections.delete",{id:e})}testConnection(e){return this.call("connections.test",{id:e})}testDraft(e,n){return this.call("connections.test",{connection:e,...n?{id:n}:{}})}connect(e){return this.call("connections.connect",{id:e})}disconnect(e){return this.call("connections.disconnect",{id:e})}sessions(){return this.call("connections.sessions")}databases(e){return this.call("databases",{connectionId:e})}relations(e,n,i){return this.call("tables",{connectionId:e,database:n,schema:i})}describe(e,n,i,d){return this.call("columns",{connectionId:e,database:n,schema:i,table:d})}rows(e,n){return this.call("rows",e,n)}updateRow(e){return this.call("rows.update",e)}insertRow(e){return this.call("rows.insert",e)}insertRows(e){return this.call("rows.insertMany",e)}deleteRow(e){return this.call("rows.delete",e)}exportRows(e){return this.call("export",e)}sql(e){return this.call("sql",e)}sqlCancel(e){return this.call("sql.cancel",{connectionId:e})}routines(e,n,i){return this.call("routines",{connectionId:e,database:n,schema:i})}accounts(e){return this.call("accounts",{connectionId:e})}listQueries(){return this.call("queries.list")}saveQuery(e){return this.call("queries.save",e)}deleteQuery(e){return this.call("queries.delete",{id:e})}bindProject(e){return this.call("projects.bind",e)}unbindProject(e){return this.call("projects.unbind",{workspaceId:e})}redisDatabases(e){return this.call("redis.databases",{connectionId:e})}redisScan(e){return this.call("redis.scan",e)}redisKey(e,n,i){return this.call("redis.key",{connectionId:e,key:n,database:i})}redisCommand(e,n){return this.call("redis.command",{connectionId:e,command:n})}redisDelete(e,n,i){return this.call("redis.delete",{connectionId:e,key:n,database:i})}engines(){return this.call("meta")}},J=new ht;var Le=class{constructor(e){this.listeners=new Set;this.getSnapshot=()=>this.state;this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)});this.state=e}setState(e){this.state=e;for(let n of this.listeners)n()}patch(e){this.setState({...this.state,...e})}};function be(t){return(0,Ut.useSyncExternalStore)(t.subscribe,t.getSnapshot,t.getSnapshot)}var yt=class extends Le{constructor(){super({meta:null,error:""})}async load(){try{this.patch({meta:await J.meta(),error:""})}catch(e){this.patch({error:e instanceof Error?e.message:String(e)})}}get current(){return this.state.meta}engines(){return this.state.meta?.engines??[]}get allowWrites(){return this.state.meta?.allowWrites===!0}},Wt={status:"closed",version:"",error:"",databases:[]},xt=class extends Le{constructor(){super({items:[],activeId:"",loading:!1,error:"",sessions:{},testing:{}})}async load(){this.patch({loading:!0});try{let{connections:e}=await J.listConnections(),n=this.state.items.some(i=>i.id===this.state.activeId)?this.state.activeId:e[0]?.id??"";this.patch({items:e,activeId:n,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}select(e){this.patch({activeId:e})}get active(){return this.state.items.find(e=>e.id===this.state.activeId)??null}session(e){return this.state.sessions[e]??Wt}setSession(e,n){let i=this.session(e);this.patch({sessions:{...this.state.sessions,[e]:{...i,...n}}})}async create(e){let n=await J.createConnection(e);return await this.load(),this.select(n.connection.id),n.probe}async update(e,n){await J.updateConnection(e,n),this.setSession(e,{status:"closed",version:"",databases:[]}),await this.load()}async remove(e){await J.deleteConnection(e);let n={...this.state.sessions};delete n[e],this.patch({sessions:n}),await this.load()}async test(e){this.patch({testing:{...this.state.testing,[e]:!0}});try{return await J.testConnection(e)}finally{this.patch({testing:{...this.state.testing,[e]:!1}})}}async connect(e){if(this.session(e).status!=="open"){this.setSession(e,{status:"opening",error:""});try{let n=await J.connect(e),{databases:i}=await J.databases(e);this.setSession(e,{status:"open",version:n.serverVersion,databases:i,error:""})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}}async disconnect(e){await J.disconnect(e).catch(()=>{}),this.setSession(e,{...Wt})}async reloadDatabases(e){if(this.session(e).status!=="open")return this.connect(e);try{let{databases:n}=await J.databases(e);this.setSession(e,{databases:n})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}};function Jt(t,e,n=""){return`${t}|${e}|${n}`}var wt=class extends Le{constructor(){super({relations:{},routines:{},accounts:{},loading:{},errors:{}})}relationsOf(e){return this.state.relations[e]??[]}routinesOf(e){return this.state.routines[e]??[]}accountsOf(e){return this.state.accounts[e]??[]}isLoading(e){return this.state.loading[e]===!0}errorOf(e){return this.state.errors[e]??""}async run(e,n,i){this.patch({loading:{...this.state.loading,[e]:!0}});try{let d=await n();this.setState({...this.state,...i(d),loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:""}})}catch(d){this.setState({...this.state,loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:d instanceof Error?d.message:String(d)}})}}async loadRelations(e,n,i="",d=!1){let r=Jt(e,n,i);!d&&this.state.relations[r]||await this.run(r,()=>J.relations(e,n,i),({tables:p})=>({relations:{...this.state.relations,[r]:p}}))}async loadRoutines(e,n,i="",d=!1){let r=Jt(e,n,i);!d&&this.state.routines[r]||await this.run(r,()=>J.routines(e,n,i),({routines:p})=>({routines:{...this.state.routines,[r]:p}}))}async loadAccounts(e,n=!1){!n&&this.state.accounts[e]||await this.run(e,()=>J.accounts(e),({accounts:i})=>({accounts:{...this.state.accounts,[e]:i}}))}invalidate(e){let n={...this.state.relations};delete n[e],this.patch({relations:n})}},kt=class extends Le{constructor(){super({tabs:[],activeId:""})}open(e){let n=this.state.tabs.some(i=>i.id===e.id);this.setState({tabs:n?this.state.tabs:this.state.tabs.concat(e),activeId:e.id})}activate(e){this.patch({activeId:e})}close(e){let n=this.state.tabs.findIndex(r=>r.id===e),i=this.state.tabs.filter(r=>r.id!==e),d=i[Math.max(0,n-1)];this.setState({tabs:i,activeId:this.state.activeId===e?d?.id??"":this.state.activeId})}closeAll(){this.setState({tabs:[],activeId:""})}closeOthers(e){let n=this.state.tabs.find(i=>i.id===e);this.setState({tabs:n?[n]:[],activeId:n?n.id:""})}closeToRight(e){let n=this.state.tabs.findIndex(r=>r.id===e);if(n===-1)return;let i=this.state.tabs.slice(0,n+1),d=i.some(r=>r.id===this.state.activeId);this.setState({tabs:i,activeId:d?this.state.activeId:e})}closeToLeft(e){let n=this.state.tabs.findIndex(r=>r.id===e);if(n===-1)return;let i=this.state.tabs.slice(n),d=i.some(r=>r.id===this.state.activeId);this.setState({tabs:i,activeId:d?this.state.activeId:e})}closeConnection(e){let n=this.state.tabs.filter(d=>d.connectionId!==e),i=n.some(d=>d.id===this.state.activeId);this.setState({tabs:n,activeId:i?this.state.activeId:n[n.length-1]?.id??""})}get active(){return this.state.tabs.find(e=>e.id===this.state.activeId)??null}},Nt=class extends Le{constructor(){super({items:[],loading:!1,error:""})}async load(){this.patch({loading:!0});try{let{queries:e}=await J.listQueries();this.patch({items:e,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}async save(e){let{query:n}=await J.saveQuery(e);return await this.load(),n}async remove(e){await J.deleteQuery(e),await this.load()}},Ze=class{constructor(){this.meta=new yt;this.connections=new xt;this.catalog=new wt;this.tabs=new kt;this.queries=new Nt}async bootstrap(){await Promise.all([this.meta.load(),this.connections.load(),this.queries.load()])}bindings(){return this.meta.current?.bindings??[]}bindingFor(e){return this.bindings().find(n=>n.workspaceId===e)??null}};var Pe=require("react"),St=require("react-dom"),E=require("react/jsx-runtime"),Xt={plus:"M12 5v14M5 12h14",refresh:"M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6",play:"M8 5v14l11-7z",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",pencil:"M4 20h4L20 8l-4-4L4 16z",chevron:"M9 6l6 6-6 6",chevronLeft:"M15 6l-6 6 6 6",database:"M21 5c0 1.66-4.03 3-9 3S3 6.66 3 5s4.03-3 9-3 9 1.34 9 3z M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5 M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3",table:"M4 5h16v14H4zM4 10h16M10 10v9",view:"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",key:"M14 4a6 6 0 1 0-5.2 8.9L4 18v2h3v-3h3v-3h2.2A6 6 0 0 0 14 4z",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",download:"M12 4v10M8 11l4 4 4-4M5 19h14",x:"M6 6l12 12M18 6L6 18",check:"M5 13l4 4L19 7",plug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3",unplug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-6 6M12 18v3M4 4l16 16",filter:"M4 5h16l-6 7v6l-4 2v-8z",folder:"M3 6h6l2 2h10v11H3z",copy:"M9 9h10v10H9zM5 15V5h10",alert:"M12 4l9 16H3zM12 10v4M12 17h.01",columns:"M4 5h16M4 12h16M4 19h16",wand:"M4 20l10-10M14 5l1.5 1.5M18 3l1 2 2 .5-2 1.5.5 2-2-1-2 1 .5-2-2-1.5 2-.5z",history:"M12 8v5l3 2M4 12a8 8 0 1 0 3-6.2M4 4v4h4",function:"M9 4c-2 0-3 1-3 3v10c0 2-1 3-3 3M6 11h7M15 14l5 6M20 14l-5 6",user:"M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",bookmark:"M6 4h12v17l-6-4-6 4z",archive:"M4 4h16v4H4zM5 8h14v12H5zM9 13h6",link:"M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",info:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 8h.01",shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",eyeOff:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"};function k({name:t,size:e=14}){return(0,E.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:"false",children:(0,E.jsx)("path",{d:Xt[t]??Xt.table})})}function O(t){let e=["dg-btn","ant-btn"];return t.className&&e.push(t.className),t.variant&&t.variant!=="default"?(e.push(`dg-btn-${t.variant}`),e.push(`ant-btn-${t.variant}`)):e.push("ant-btn-default"),t.size&&(e.push(`dg-btn-${t.size}`),e.push(`ant-btn-${t.size}`)),t.active&&e.push("dg-btn-active","ant-btn-active"),t.loading&&e.push("ant-btn-loading"),t.block&&e.push("ant-btn-block"),(0,E.jsxs)("button",{type:t.type??"button",className:e.join(" "),onClick:t.onClick,disabled:t.disabled||t.loading,title:t.title,"aria-label":t.title,"aria-pressed":t.active,style:t.style,children:[t.loading?(0,E.jsx)(xe,{}):t.icon?(0,E.jsx)(k,{name:t.icon,size:t.size==="sm"?11:13}):null,t.children]})}function le(t){return(0,E.jsx)("button",{type:"button",className:`dg-iconbtn ant-btn ant-btn-icon-only${t.active?" dg-btn-active":""}${t.className?` ${t.className}`:""}`,title:t.title,"aria-label":t.title,onClick:t.onClick,disabled:t.disabled,children:(0,E.jsx)(k,{name:t.icon,size:t.size??13})})}function oe(t){return(0,E.jsxs)("label",{className:`dg-field ant-form-item${t.wide?" dg-field-wide":""}${t.required?" dg-field-required ant-form-item-required":""}${t.className?` ${t.className}`:""}`,style:t.style,children:[(0,E.jsx)("span",{className:"dg-field-label ant-form-item-label",children:t.label}),t.children,t.hint?(0,E.jsx)("span",{className:"dg-field-hint ant-form-item-explain",children:t.hint}):null]})}function ne(t){let{className:e,...n}=t;return(0,E.jsx)("input",{...n,className:`dg-input ant-input${e?` ${e}`:""}`})}function et(t){let{className:e,...n}=t;return(0,E.jsx)("textarea",{...n,className:`dg-input dg-textarea ant-input ant-input-textarea${e?` ${e}`:""}`})}function we(t){return(0,E.jsx)("select",{...t,className:`dg-input dg-select ant-select${t.className?` ${t.className}`:""}`})}function Re(t){let e=["dg-card","ant-card"];return t.hoverable&&e.push("dg-card-hoverable","ant-card-hoverable"),t.size==="small"&&e.push("dg-card-sm","ant-card-small"),t.bordered===!1&&e.push("ant-card-borderless"),t.className&&e.push(t.className),(0,E.jsxs)("div",{className:e.join(" "),style:t.style,onClick:t.onClick,children:[t.title||t.extra?(0,E.jsxs)("div",{className:"dg-card-head ant-card-head",children:[(0,E.jsx)("div",{className:"dg-card-head-title ant-card-head-title",children:t.title}),t.extra?(0,E.jsx)("div",{className:"dg-card-extra ant-card-extra",children:t.extra}):null]}):null,(0,E.jsx)("div",{className:"dg-card-body ant-card-body",children:t.children})]})}function _t(t){return(0,E.jsx)("div",{className:"dg-split",role:"separator","aria-orientation":"vertical",onMouseDown:n=>{n.preventDefault();let i=n.clientX,d=t.width;t.onDragging?.(!0);let r=g=>{t.setWidth(Math.max(t.min,Math.min(t.max,d+g.clientX-i)))},p=()=>{t.onDragging?.(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",p)};window.addEventListener("mousemove",r),window.addEventListener("mouseup",p)}})}function Fe(t){let e=t.color&&t.color!=="default"?` dg-tag-${t.color} ant-tag-${t.color}`:"";return(0,E.jsxs)("span",{className:`dg-tag ant-tag${e}${t.bordered===!1?" ant-tag-borderless":""}${t.className?` ${t.className}`:""}`,style:t.style,onClick:t.onClick,children:[t.icon?(0,E.jsx)(k,{name:t.icon,size:11}):null,t.children]})}function Ct(t){return t.status||t.text?(0,E.jsxs)("span",{className:`dg-badge-status ant-badge ant-badge-status${t.className?` ${t.className}`:""}`,children:[(0,E.jsx)("span",{className:`dg-badge-status-dot ant-badge-status-dot dg-badge-status-${t.status??"default"} ant-badge-status-${t.status??"default"}`}),t.text?(0,E.jsx)("span",{className:"dg-badge-status-text ant-badge-status-text",children:t.text}):null,t.children]}):(0,E.jsxs)("span",{className:`dg-badge ant-badge${t.className?` ${t.className}`:""}`,children:[t.children,t.count!==void 0?(0,E.jsx)("sup",{className:"ant-badge-count",children:t.count}):null]})}function Gt({status:t}){return(0,E.jsx)("span",{className:`dg-dot${t==="open"?" dg-dot-open ant-badge-status-success":t==="error"?" dg-dot-error ant-badge-status-error":t==="opening"?" dg-dot-busy ant-badge-status-processing":" ant-badge-status-default"}`})}function Tt(t){let e=t.type??"info",n=t.children??t.message;if(!n)return null;let i=e==="error"||e==="warning"?"alert":e==="success"?"check":"info";return(0,E.jsxs)("div",{className:`dg-banner ant-alert dg-banner-${e} ant-alert-${e}${t.description?" ant-alert-with-description":""}${t.className?` ${t.className}`:""}`,style:t.style,role:"alert",children:[t.showIcon!==!1?(0,E.jsx)("span",{className:"ant-alert-icon",children:(0,E.jsx)(k,{name:i,size:t.description?16:14})}):null,(0,E.jsxs)("div",{className:"ant-alert-content",children:[(0,E.jsx)("div",{className:"dg-banner-text ant-alert-message",children:n}),t.description?(0,E.jsx)("div",{className:"ant-alert-description",children:t.description}):null]}),t.closable||t.onClose?(0,E.jsx)("button",{type:"button",className:"dg-iconbtn dg-iconbtn-tiny ant-alert-close-icon",onClick:t.onClose,"aria-label":"close",children:(0,E.jsx)(k,{name:"x",size:10})}):null]})}function fe(t){return(0,E.jsx)(Tt,{type:t.tone??"info",onClose:t.onClose,children:t.children})}function Yt(t){return(0,E.jsx)("div",{className:`dg-seg ant-segmented${t.size==="sm"?" ant-segmented-sm":""}`,children:(0,E.jsx)("div",{className:"ant-segmented-group",children:t.options.map(e=>(0,E.jsx)("button",{type:"button",className:`ant-segmented-item${e.value===t.value?" dg-seg-on ant-segmented-item-selected":""}`,onClick:()=>t.onChange(e.value),children:e.label},e.value))})})}function xe({label:t}){return(0,E.jsxs)("span",{className:"dg-spinner-row ant-spin ant-spin-spinning",children:[(0,E.jsx)("span",{className:"dg-spinner ant-spin-dot","aria-hidden":!0}),t?(0,E.jsx)("span",{className:"ant-spin-text",children:t}):null]})}function ve({title:t,hint:e,children:n}){return(0,E.jsxs)("div",{className:"dg-empty ant-empty",children:[(0,E.jsx)("div",{className:"ant-empty-image",children:(0,E.jsx)(k,{name:"database",size:36})}),(0,E.jsx)("div",{className:"dg-empty-title ant-empty-description",children:t}),e?(0,E.jsx)("div",{className:"dg-empty-hint",children:e}):null,n?(0,E.jsx)("div",{className:"ant-empty-footer",children:n}):null]})}function Te(t){let e=(0,Pe.useRef)(null),n=(0,Pe.useRef)(t.onClose);n.current=t.onClose;let i=(0,Pe.useRef)(t.busy);return i.current=t.busy,(0,Pe.useEffect)(()=>{let d=p=>{p.key==="Escape"&&!i.current&&(p.stopPropagation(),n.current())};document.addEventListener("keydown",d);let r=setTimeout(()=>e.current?.focus(),0);return()=>{document.removeEventListener("keydown",d),clearTimeout(r)}},[]),(0,St.createPortal)((0,E.jsx)("div",{className:"dg-backdrop ant-modal-root",onMouseDown:d=>{d.target===d.currentTarget&&!t.busy&&t.onClose()},children:(0,E.jsxs)("div",{className:`dg-modal ant-modal${t.className?` ${t.className}`:""}`,style:{width:`${t.width??560}px`},role:"dialog","aria-modal":"true","aria-label":t.title,children:[(0,E.jsxs)("div",{className:"dg-modal-head ant-modal-header",children:[(0,E.jsxs)("div",{className:"dg-modal-title-wrap ant-modal-title",children:[t.icon?(0,E.jsx)("span",{className:"dg-modal-icon-badge",children:(0,E.jsx)(k,{name:t.icon,size:15})}):null,(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"dg-modal-title",children:t.title}),t.subtitle?(0,E.jsx)("div",{className:"dg-modal-subtitle",children:t.subtitle}):null]})]}),(0,E.jsx)("button",{ref:e,type:"button",className:"dg-iconbtn ant-modal-close",onClick:()=>!t.busy&&t.onClose(),"aria-label":"close",children:(0,E.jsx)(k,{name:"x",size:13})})]}),(0,E.jsx)("div",{className:"dg-modal-body ant-modal-body",children:t.children}),t.footer?(0,E.jsx)("div",{className:"dg-modal-foot ant-modal-footer",children:t.footer}):null]})}),document.body)}function je(t){let e=(0,Pe.useRef)(null);(0,Pe.useEffect)(()=>{let i=r=>{e.current&&!e.current.contains(r.target)&&t.onClose()},d=r=>{r.key==="Escape"&&t.onClose()};return document.addEventListener("mousedown",i),document.addEventListener("keydown",d),()=>{document.removeEventListener("mousedown",i),document.removeEventListener("keydown",d)}},[t.onClose]);let n=t.items.filter(Boolean);return(0,St.createPortal)((0,E.jsx)("div",{ref:e,className:"dg-ctxmenu ant-dropdown-menu",role:"menu",style:{left:`${Math.min(t.x,window.innerWidth-200)}px`,top:`${Math.min(t.y,Math.max(8,window.innerHeight-40-n.length*28))}px`},children:n.map((i,d)=>i.separator?(0,E.jsx)("div",{className:"dg-ctxsep ant-dropdown-menu-item-divider"},`sep-${d}`):(0,E.jsxs)("button",{type:"button",role:"menuitem",className:`dg-ctxitem ant-dropdown-menu-item${i.danger?" dg-ctxitem-danger ant-dropdown-menu-item-danger":""}`,disabled:i.disabled,onClick:()=>{t.onClose(),i.disabled||i.onClick?.()},children:[i.icon?(0,E.jsx)(k,{name:i.icon,size:12}):null,i.label,i.hint?(0,E.jsx)("span",{className:"dg-ctxhint",children:i.hint}):null]},`${i.label}-${d}`))}),document.body)}var Zt=`/* Grid panel styles.
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

/* Connection dialog owns its Portal sizing; do not depend on the Host reset. */
.dg-connection-dialog,
.dg-connection-dialog *,
.dg-connection-dialog *::before,
.dg-connection-dialog *::after { box-sizing: border-box; }
.dg-connection-dialog {
  max-width: calc(100vw - 32px);
  color: var(--dg-text);
  font-size: var(--dg-fs-sm);
  line-height: var(--dg-lh-body);
  container-type: inline-size;
}
.dg-connection-dialog .dg-modal-body > * { flex-shrink: 0; }
.dg-connection-dialog .dg-dialog-tab-body,
.dg-connection-dialog .dg-tab-panel { min-width: 0; }
.dg-connection-dialog .dg-dialog-tabs { margin: 0; flex-shrink: 0; gap: var(--dg-sp-5); }
.dg-connection-dialog .dg-dialog-tab { padding: var(--dg-sp-3) 0; font-size: var(--dg-fs-sm); }
.dg-connection-dialog .dg-connection-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--dg-sp-5) var(--dg-sp-6);
  align-items: start;
}
.dg-connection-dialog .dg-field-wide,
.dg-connection-wide { grid-column: 1 / -1; }
.dg-connection-address {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  gap: var(--dg-sp-5);
  align-items: start;
  min-width: 0;
}
.dg-connection-section { display: flex; flex-direction: column; gap: var(--dg-sp-5); min-width: 0; }
.dg-connection-dialog .dg-input { width: 100%; }
.dg-connection-dialog .dg-field-label { min-height: 20px; line-height: 20px; }
.dg-connection-dialog .dg-field-label::before { font: inherit; line-height: 1; }
.dg-connection-dialog .dg-field-wrap,
.dg-connection-dialog .dg-field-hint { min-width: 0; overflow-wrap: anywhere; }
.dg-connection-dialog .dg-field-required::before { content: none; }
.dg-connection-dialog .dg-input-affix-wrapper > textarea { padding-right: var(--dg-sp-4); }
.dg-connection-dialog .dg-input-affix-wrapper:has(textarea) { flex-direction: column; align-items: stretch; }
.dg-connection-dialog .dg-input-affix-wrapper:has(textarea) .dg-input-suffix-actions { position: static; align-self: flex-end; }
.dg-connection-dialog .dg-banner { margin: 0; background: var(--dg-surface-2); border-color: var(--dg-line); }
.dg-connection-dialog .dg-banner-error { background: var(--dg-error-soft); border-color: var(--dg-error); }
.dg-connection-dialog .dg-checkbox-row { font-weight: 500; }
.dg-connection-dialog .dg-swatch { width: 28px; height: 28px; }
.dg-connection-options { border-top: 1px solid var(--dg-line); margin-top: var(--dg-sp-2); }
.dg-connection-options > summary { padding: var(--dg-sp-4) 0; color: var(--dg-text-2); cursor: pointer; font-weight: 500; }
.dg-connection-options > summary:hover { color: var(--dg-text); }
.dg-connection-options > .dg-connection-grid { padding-bottom: var(--dg-sp-2); }
.dg-connection-footer { display: flex; align-items: center; flex-wrap: wrap; gap: var(--dg-sp-3); width: 100%; min-width: 0; }
.dg-connection-actions { display: flex; gap: var(--dg-sp-3); margin-left: auto; }
.dg-connection-footer .dg-connection-probe { order: 1; flex-basis: 100%; height: auto; white-space: normal; overflow-wrap: anywhere; }
.dg-connection-dialog .dg-dialog-tab-active::after { left: 0; right: 0; }
@container (max-width: 560px) {
  .dg-connection-dialog .dg-connection-grid { grid-template-columns: minmax(0, 1fr); }
  .dg-connection-address { grid-template-columns: minmax(0, 1fr) 96px; gap: var(--dg-sp-3); }
  .dg-connection-dialog .dg-modal-body { padding: var(--dg-sp-5); }
  .dg-connection-dialog .dg-modal-head,
  .dg-connection-dialog .dg-modal-foot { padding-left: var(--dg-sp-5); padding-right: var(--dg-sp-5); }
}

/* engine cards in connection dialog ---------------------------------------- */
.dg-engines {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 128px), 1fr));
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
.dg-connection-dialog .dg-engine { height: auto; min-height: 44px; min-width: 0; font: inherit; }
.dg-connection-dialog .dg-engine-name { white-space: normal; overflow-wrap: anywhere; }
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
`;var Se=require("react");var u=require("react/jsx-runtime"),Ln={mysql:{color:"#00758f",glyph:"cylinder"},postgres:{color:"#336791",glyph:"cylinder"},sqlite:{color:"#0f80cc",glyph:"file"},sqlserver:{color:"#cc2927",glyph:"cylinder"},redis:{color:"#dc382d",glyph:"layers"}},Hn=[{value:"none",color:"var(--dsw-alias-border-l2)"},{value:"green",color:"var(--dsw-alias-state-success-primary)"},{value:"yellow",color:"var(--dsw-alias-state-warn-primary)"},{value:"red",color:"var(--dsw-alias-state-error-primary)"}];function Bn({engine:t,size:e=20}){let n=Ln[t]??{color:"#1677ff",glyph:"cylinder"},i=n.glyph==="layers"?"M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5":n.glyph==="file"?"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8":"M21 5c0 1.66-4.03 3-9 3S3 6.66 3 5s4.03-3 9-3 9 1.34 9 3z M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5 M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3";return(0,u.jsx)("span",{className:"dg-logo",style:{width:e,height:e,color:n.color},"aria-hidden":!0,children:(0,u.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",children:(0,u.jsx)("path",{d:i})})})}function tt(t){let{t:e,draft:n,hasSaved:i,disabled:d}=t,[r,p]=(0,Se.useState)(!1),g=n.clear?e("secretClearPending"):i?e("secretKeep"):void 0;return(0,u.jsx)("div",{className:`dg-field-wrap${t.wide?" dg-connection-wide":""}`,children:(0,u.jsxs)(oe,{label:t.label,required:t.required,hint:g,children:[(0,u.jsxs)("div",{className:"dg-input-affix-wrapper",children:[t.multiline?(0,u.jsx)(et,{"aria-label":t.label,value:n.value,onChange:f=>t.onChange(f.target.value),rows:4,autoComplete:"off",spellCheck:!1,disabled:d,placeholder:t.placeholder??"\u2014"}):(0,u.jsx)(ne,{"aria-label":t.label,type:r?"text":"password",value:n.value,onChange:f=>t.onChange(f.target.value),autoComplete:"new-password",disabled:d,placeholder:n.clear?e("secretClearPending"):i?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":t.placeholder??(t.required?"":e("optional"))}),(0,u.jsxs)("div",{className:"dg-input-suffix-actions",children:[!t.multiline&&(n.value||i)?(0,u.jsx)("button",{type:"button",className:"dg-input-action-btn",title:e(r?"hidePassword":"showPassword"),"aria-label":e(r?"hidePassword":"showPassword"),"aria-pressed":r,onClick:()=>p(!r),children:(0,u.jsx)(k,{name:r?"eyeOff":"eye",size:13})}):null,i?(0,u.jsx)("button",{type:"button",className:"dg-btn-inline-clear ant-btn ant-btn-link",disabled:d,onClick:()=>t.onClear(!n.clear),children:n.clear?e("secretUndoClear"):e("secretClear")}):null]})]}),t.hint?(0,u.jsx)("div",{className:"dg-field-hint",children:t.hint}):null]})})}function en(t){let{t:e,engines:n}=t,i=t.initial,[d,r]=(0,Se.useState)(i?.engine??"sqlite"),[p,g]=(0,Se.useState)("general"),[f,v]=(0,Se.useState)(!!(i?.group||i?.color&&i.color!=="none")),[x,B]=(0,Se.useState)(()=>({name:i?.name??"",group:i?.group??"",host:i?.host||"127.0.0.1",port:i?.port?String(i.port):"",user:i?.user??"",database:i?.database??"",file:i?.file??"",redisDb:String(i?.redisDb??0),sslMode:i?.sslMode??"disable",tlsServerName:i?.tlsServerName??"",color:i?.color??"none"})),[T,S]=(0,Se.useState)(()=>({enabled:i?.ssh?.enabled===!0,host:i?.ssh?.host??"",port:String(i?.ssh?.port??22),username:i?.ssh?.username??"",authType:i?.ssh?.authType??"password",hostFingerprint:i?.ssh?.hostFingerprint??""})),[I,$]=(0,Se.useState)(()=>({password:{value:"",clear:!1},sshPassword:{value:"",clear:!1},privateKey:{value:"",clear:!1},passphrase:{value:"",clear:!1}})),[H,q]=(0,Se.useState)(null),[z,j]=(0,Se.useState)(!1),[G,W]=(0,Se.useState)(!1),[se,V]=(0,Se.useState)(""),Z=n.find(a=>a.id===d),ee=d!=="sqlite"&&Z?.kind!=="file",w=z||G,P=ee?`${Z?.label??d} \xB7 ${x.host.trim()||"127.0.0.1"}${d!=="redis"&&x.database.trim()?` / ${x.database.trim()}`:""}`:x.file.trim().split(/[\\/]/).pop()||Z?.label||"SQLite",F=a=>s=>B(m=>({...m,[a]:s.target.value})),R=a=>s=>S(m=>({...m,[a]:s.target.value})),Y=(a,s)=>$(m=>({...m,[a]:{value:s,clear:!1}})),X=(a,s)=>$(m=>({...m,[a]:{value:"",clear:s}})),ae=(a,s)=>({t:e,draft:I[a],hasSaved:s,disabled:w,onChange:m=>Y(a,m),onClear:m=>X(a,m)}),pe=a=>{S(s=>({...s,authType:a})),$(s=>a==="password"?{...s,privateKey:{value:"",clear:!0},passphrase:{value:"",clear:!0}}:{...s,sshPassword:{value:"",clear:!0}})},he=()=>{let a="";return ee&&d==="sqlserver"&&x.sslMode==="verify-ca"?(a=e("sqlserverVerifyCaUnsupported"),g("ssl")):ee&&T.enabled&&(!T.host.trim()||!T.username.trim()||!["password","privateKey"].includes(T.authType)?(a=e("sshFieldsRequired"),g("ssh")):!/^\d+$/.test(T.port)||Number(T.port)<1||Number(T.port)>65535?(a=e("sshPortInvalid"),g("ssh")):/^SHA256:[A-Za-z0-9+/]{43}=?$/.test(T.hostFingerprint.trim())||(a=e("sshFingerprintInvalid"),g("ssh"))),V(a),a&&q(null),!a},re=()=>{let a={name:x.name.trim()||P,engine:d,group:x.group.trim(),host:x.host.trim(),port:Number.parseInt(x.port,10)||Z?.defaultPort||0,user:x.user.trim(),database:x.database.trim(),file:x.file.trim(),redisDb:Number.parseInt(x.redisDb,10)||0,sslMode:x.sslMode,color:x.color};if(ee)if(a.tlsServerName=x.tlsServerName.trim(),(I.password.value!==""||I.password.clear)&&(a.password=I.password.value),T.enabled){let s={enabled:!0,host:T.host.trim(),port:Number(T.port),username:T.username.trim(),authType:T.authType,hostFingerprint:T.hostFingerprint.trim()};T.authType==="password"?((I.sshPassword.value!==""||I.sshPassword.clear)&&(s.password=I.sshPassword.value),I.privateKey.clear&&(s.privateKey=""),I.passphrase.clear&&(s.passphrase="")):((I.privateKey.value!==""||I.privateKey.clear)&&(s.privateKey=I.privateKey.value),(I.passphrase.value!==""||I.passphrase.clear)&&(s.passphrase=I.passphrase.value),I.sshPassword.clear&&(s.password="")),a.ssh=s}else a.ssh={enabled:!1};else a.ssh={enabled:!1};return a},Ne=async()=>{if(he()){j(!0),q(null),V("");try{let a=await J.testDraft(re(),i?.id);q({ok:!0,text:me(e("testOk"),{version:a.serverVersion??"",ms:a.latencyMs??0})})}catch(a){q({ok:!1,text:me(e("testFailed"),{error:a instanceof Error?a.message:String(a)})})}finally{j(!1)}}},b=async()=>{if(he()){W(!0),V("");try{await t.onSave(re())}catch(a){V(a instanceof Error?a.message:String(a)),W(!1)}}};return(0,u.jsxs)(Te,{icon:"database",title:e(i?"edit":"newConnection"),onClose:t.onClose,busy:w,width:840,className:"dg-connection-dialog",footer:(0,u.jsxs)("div",{className:"dg-connection-footer",children:[(0,u.jsxs)(O,{onClick:()=>{Ne()},disabled:w,children:[z?(0,u.jsx)(xe,{}):null,e("test")]}),H?.text?(0,u.jsxs)("span",{className:`dg-connection-probe ${H.ok?"dg-tag dg-tag-green":"dg-tag dg-tag-red"}`,role:"status",title:H.text,children:[(0,u.jsx)(k,{name:H.ok?"check":"alert",size:11}),H.text]}):null,(0,u.jsxs)("div",{className:"dg-connection-actions",children:[(0,u.jsx)(O,{onClick:t.onClose,disabled:w,children:e("cancel")}),(0,u.jsxs)(O,{variant:"primary",onClick:()=>{b()},disabled:w,children:[G?(0,u.jsx)(xe,{}):null,e("save")]})]})]}),children:[(0,u.jsx)("div",{className:"dg-engines",children:n.map(a=>(0,u.jsxs)("button",{type:"button",className:`dg-engine${a.id===d?" dg-engine-active":""}`,"aria-pressed":a.id===d,disabled:w,onClick:()=>{a.id!==d&&(r(a.id),B(s=>({...s,port:String(a.defaultPort||""),sslMode:"disable"})),q(null),a.kind==="file"&&g("general"))},children:[(0,u.jsx)(Bn,{engine:a.id,size:20}),(0,u.jsx)("span",{className:"dg-engine-name",children:a.label})]},a.id))}),ee?(0,u.jsxs)("div",{className:"dg-dialog-tabs",role:"tablist",children:[(0,u.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-general","aria-selected":p==="general","aria-controls":"tab-pane-general",className:`dg-dialog-tab${p==="general"?" dg-dialog-tab-active":""}`,onClick:()=>g("general"),children:[(0,u.jsx)(k,{name:"database",size:13}),(0,u.jsx)("span",{children:e("tabGeneral")})]}),(0,u.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-ssh","aria-selected":p==="ssh","aria-controls":"tab-pane-ssh",className:`dg-dialog-tab${p==="ssh"?" dg-dialog-tab-active":""}`,onClick:()=>g("ssh"),children:[(0,u.jsx)(k,{name:"link",size:13}),(0,u.jsx)("span",{children:e("sshSection")}),T.enabled?(0,u.jsx)("span",{className:"dg-tab-dot-badge dg-tab-dot-active"}):null]}),(0,u.jsxs)("button",{type:"button",role:"tab",id:"tab-btn-ssl","aria-selected":p==="ssl","aria-controls":"tab-pane-ssl",className:`dg-dialog-tab${p==="ssl"?" dg-dialog-tab-active":""}`,onClick:()=>g("ssl"),children:[(0,u.jsx)(k,{name:"shield",size:13}),(0,u.jsx)("span",{children:e("tabSsl")}),x.sslMode!=="disable"?(0,u.jsx)("span",{className:"dg-tab-dot-badge dg-tab-dot-active"}):null]})]}):null,(0,u.jsxs)("div",{className:"dg-dialog-tab-body",children:[(0,u.jsxs)("div",{role:"tabpanel",id:"tab-pane-general","aria-labelledby":"tab-btn-general",className:"dg-tab-panel",style:{display:p==="general"?"flex":"none"},children:[(0,u.jsxs)("div",{className:"dg-connection-grid",children:[(0,u.jsx)(oe,{label:e("name"),wide:!0,hint:e("nameAutoHint"),children:(0,u.jsx)(ne,{value:x.name,onChange:F("name"),placeholder:P,disabled:w})}),ee?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"dg-connection-address dg-connection-wide",children:[(0,u.jsx)(oe,{label:e("host"),required:!0,hint:T.enabled?e("sshDatabaseHostHint"):void 0,children:(0,u.jsx)(ne,{value:x.host,onChange:F("host"),placeholder:"127.0.0.1",disabled:w})}),(0,u.jsx)(oe,{label:e("port"),children:(0,u.jsx)(ne,{value:x.port,onChange:F("port"),inputMode:"numeric",placeholder:String(Z?.defaultPort??""),disabled:w})})]}),(0,u.jsx)(oe,{label:e("user"),required:d!=="redis",children:(0,u.jsx)(ne,{value:x.user,onChange:F("user"),placeholder:d==="redis"?e("optional"):"root",disabled:w})}),(0,u.jsx)(tt,{label:e("password"),...ae("password",i?.hasPassword??!1),placeholder:e("optional")}),d==="redis"?(0,u.jsx)(oe,{label:e("redisDb"),wide:!0,children:(0,u.jsx)(ne,{value:x.redisDb,onChange:F("redisDb"),inputMode:"numeric",placeholder:"0",disabled:w})}):(0,u.jsx)(oe,{label:e("database"),wide:!0,children:(0,u.jsx)(ne,{value:x.database,onChange:F("database"),placeholder:e("optional"),disabled:w})})]}):(0,u.jsx)(oe,{label:e("file"),wide:!0,required:!0,children:(0,u.jsx)(ne,{value:x.file,onChange:F("file"),placeholder:"C:/data/app.db",disabled:w})})]}),(0,u.jsxs)("details",{className:"dg-connection-options",open:f,onToggle:a=>v(a.currentTarget.open),children:[(0,u.jsx)("summary",{children:e("connectionOptions")}),(0,u.jsxs)("div",{className:"dg-connection-grid",children:[(0,u.jsx)(oe,{label:e("group"),children:(0,u.jsx)(ne,{value:x.group,onChange:F("group"),placeholder:"dev / staging / prod",disabled:w})}),(0,u.jsxs)("div",{className:"dg-field",role:"group","aria-label":e("color"),children:[(0,u.jsx)("span",{className:"dg-field-label",children:e("color")}),(0,u.jsx)("div",{className:"dg-colors",children:Hn.map(a=>(0,u.jsx)("button",{type:"button",className:`dg-swatch${a.value==="none"?" dg-swatch-none":""}${x.color===a.value?" dg-swatch-on":""}`,style:{background:a.color},title:e(`color${a.value[0].toUpperCase()}${a.value.slice(1)}`),"aria-label":e(`color${a.value[0].toUpperCase()}${a.value.slice(1)}`),"aria-pressed":x.color===a.value,disabled:w,onClick:()=>B(s=>({...s,color:a.value})),children:x.color===a.value?(0,u.jsx)(k,{name:"check",size:10}):null},a.value))})]})]})]})]}),ee?(0,u.jsx)("div",{role:"tabpanel",id:"tab-pane-ssh","aria-labelledby":"tab-btn-ssh",className:"dg-tab-panel",style:{display:p==="ssh"?"flex":"none"},children:(0,u.jsxs)("div",{className:"dg-connection-section",children:[(0,u.jsxs)("label",{className:"dg-field-label dg-checkbox-row",children:[(0,u.jsx)("input",{type:"checkbox",checked:T.enabled,disabled:w,onChange:a=>{S(s=>({...s,enabled:a.target.checked})),q(null)}}),(0,u.jsx)("span",{children:e("sshEnable")})]}),T.enabled?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"dg-field-hint",children:e("sshSingleHopHint")}),(0,u.jsxs)("div",{className:"dg-connection-grid",children:[(0,u.jsxs)("div",{className:"dg-connection-address dg-connection-wide",children:[(0,u.jsx)(oe,{label:e("sshHost"),required:!0,children:(0,u.jsx)(ne,{value:T.host,onChange:R("host"),required:!0,disabled:w,autoComplete:"off",placeholder:"jump.example.com"})}),(0,u.jsx)(oe,{label:e("sshPort"),children:(0,u.jsx)(ne,{value:T.port,onChange:R("port"),required:!0,inputMode:"numeric",disabled:w,placeholder:"22"})})]}),(0,u.jsx)(oe,{label:e("sshUsername"),required:!0,children:(0,u.jsx)(ne,{value:T.username,onChange:R("username"),required:!0,disabled:w,autoComplete:"off",placeholder:"deploy"})}),(0,u.jsx)(oe,{label:e("sshAuthType"),required:!0,children:(0,u.jsxs)(we,{value:T.authType,disabled:w,required:!0,onChange:a=>pe(a.target.value),children:[(0,u.jsx)("option",{value:"password",children:e("sshAuthPassword")}),(0,u.jsx)("option",{value:"privateKey",children:e("sshAuthPrivateKey")})]})}),(0,u.jsx)(oe,{label:e("sshHostFingerprint"),wide:!0,required:!0,hint:e("sshFingerprintHint"),children:(0,u.jsx)(ne,{value:T.hostFingerprint,onChange:R("hostFingerprint"),placeholder:"SHA256:\u2026",required:!0,disabled:w,autoComplete:"off",spellCheck:!1})}),T.authType==="password"?(0,u.jsx)(tt,{label:e("sshPassword"),wide:!0,required:!0,...ae("sshPassword",i?.ssh?.hasPassword??!1)}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(tt,{label:e("sshPrivateKey"),multiline:!0,wide:!0,required:!0,hint:e("sshPrivateKeyHint"),placeholder:"-----BEGIN OPENSSH PRIVATE KEY-----",...ae("privateKey",i?.ssh?.hasPrivateKey??!1)}),(0,u.jsx)(tt,{label:e("sshPassphrase"),wide:!0,placeholder:e("optional"),...ae("passphrase",i?.ssh?.hasPassphrase??!1)})]})]}),(0,u.jsx)(fe,{children:e("sshSecurityHint")})]}):i?.ssh?(0,u.jsx)("div",{className:"dg-field-hint",children:e("sshDisableHint")}):(0,u.jsxs)("div",{className:"dg-tab-placeholder",children:[(0,u.jsx)(k,{name:"link",size:16}),(0,u.jsx)("span",{children:e("sshSingleHopHint")})]})]})}):null,ee?(0,u.jsx)("div",{role:"tabpanel",id:"tab-pane-ssl","aria-labelledby":"tab-btn-ssl",className:"dg-tab-panel",style:{display:p==="ssl"?"flex":"none"},children:(0,u.jsxs)("div",{className:"dg-connection-grid",children:[(0,u.jsx)(oe,{label:"TLS / SSL",wide:!0,hint:d==="sqlserver"?e("sqlserverVerifyCaUnsupported"):void 0,children:(0,u.jsxs)(we,{value:x.sslMode,disabled:w,onChange:a=>B(s=>({...s,sslMode:a.target.value})),children:[(0,u.jsx)("option",{value:"disable",children:e("sslDisable")}),(0,u.jsx)("option",{value:"require",children:e("sslRequire")}),(0,u.jsx)("option",{value:"verify-ca",disabled:d==="sqlserver",children:e("sslVerifyCa")}),(0,u.jsx)("option",{value:"verify-full",children:e("sslVerifyFull")})]})}),x.sslMode!=="disable"?(0,u.jsx)(oe,{label:e("tlsServerName"),wide:!0,hint:e("tlsServerNameHint"),children:(0,u.jsx)(ne,{value:x.tlsServerName,onChange:F("tlsServerName"),placeholder:x.host.trim(),disabled:w})}):null]})}):null]}),se?(0,u.jsx)(fe,{tone:"error",onClose:()=>V(""),children:se}):null]})}var nt=require("react");var _=require("react/jsx-runtime");function tn(t){let{t:e,store:n}=t,i=be(n.meta),d=be(n.connections),[r,p]=(0,nt.useState)({}),[g,f]=(0,nt.useState)(""),[v,x]=(0,nt.useState)(""),B=i.meta?.workspaces??[],T=i.meta?.bindings??[],S=z=>T.find(j=>j.workspaceId===z),I=z=>{let j=S(z);return r[z]??{connectionId:j?.connectionId??"",database:j?.database??""}},$=(z,j)=>p(G=>({...G,[z]:{...I(z),...j}})),H=async(z,j)=>{let G=I(z);if(!G.connectionId)return x(e("selectConnection"));f(z),x("");try{await J.bindProject({workspaceId:z,workspacePath:j,connectionId:G.connectionId,database:G.database}),await n.meta.load();let se=d.items.find(w=>w.id===G.connectionId)?.name||G.connectionId,V=G.database?` (${G.database})`:"",ee=e("projectBound").replace("{name}",se).replace("\uFF08{database}\uFF09",V).replace("({database})",V).replace("{database}",G.database||"");t.notify(ee,"success")}catch(W){x(W instanceof Error?W.message:String(W))}finally{f("")}},q=async z=>{f(z);try{await J.unbindProject(z),await n.meta.load(),t.notify(e("unbindProject")+" \u2713","info")}catch(j){x(j instanceof Error?j.message:String(j))}finally{f("")}};return(0,_.jsxs)(Te,{icon:"link",title:e("workspaces"),subtitle:e("agentHint"),onClose:t.onClose,width:680,footer:(0,_.jsx)(O,{onClick:t.onClose,children:e("close")}),children:[v?(0,_.jsx)(Tt,{type:"error",message:v,closable:!0,onClose:()=>x(""),style:{marginBottom:12}}):null,B.length===0?(0,_.jsx)(ve,{title:e("noWorkspaces")}):(0,_.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:12,maxHeight:"60vh",overflow:"auto",padding:"2px 0"},children:B.map(z=>{let j=S(z.id),G=I(z.id),W=d.items.find(V=>V.id===G.connectionId),se=G.connectionId?n.connections.session(G.connectionId).databases:[];return(0,_.jsxs)(Re,{size:"small",hoverable:!0,className:"dg-ws-card",children:[(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:10},children:[(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,minWidth:0,flex:1},children:[(0,_.jsx)("span",{className:"dg-ws-icon",children:(0,_.jsx)(k,{name:"folder",size:15})}),(0,_.jsxs)("div",{style:{minWidth:0,flex:1},children:[(0,_.jsx)("div",{style:{fontWeight:600,fontSize:13,color:"var(--dg-text)"},children:z.title}),(0,_.jsx)("div",{style:{fontSize:12,color:"var(--dg-text-2)",fontFamily:"var(--dg-mono)",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",marginTop:2},title:z.path,children:z.path})]})]}),j?(0,_.jsx)(Ct,{status:"success",text:(0,_.jsx)("span",{style:{fontWeight:500,color:"var(--ant-success, #52c41a)"},children:e("boundProject")})}):(0,_.jsx)(Ct,{status:"default",text:(0,_.jsx)("span",{style:{color:"var(--dg-text-3)"},children:e("projectUnbound")})})]}),j?(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:12},children:[(0,_.jsx)(Fe,{color:"blue",icon:"database",children:j.connectionName||j.connectionId}),j.database?(0,_.jsx)(Fe,{color:"cyan",children:j.database}):null,(0,_.jsx)(Fe,{color:"purple",children:e("readOnlyForAgent")})]}):null,(0,_.jsxs)("div",{className:"dg-ws-form",children:[(0,_.jsx)(oe,{label:e("connections"),children:(0,_.jsxs)(we,{value:G.connectionId,onChange:V=>{let Z=V.target.value,ee=d.items.find(w=>w.id===Z);$(z.id,{connectionId:Z,database:ee?.database||""})},children:[(0,_.jsx)("option",{value:"",children:"\u2014"}),d.items.map(V=>(0,_.jsxs)("option",{value:V.id,children:[V.name," \xB7 ",V.engine]},V.id))]})}),(0,_.jsx)(oe,{label:e("database"),children:se.length>0?(0,_.jsxs)(we,{value:G.database,onChange:V=>$(z.id,{database:V.target.value}),children:[(0,_.jsx)("option",{value:"",children:W?.database?`${W.database} (default)`:"\u2014"}),se.map(V=>(0,_.jsx)("option",{value:V.name,children:V.name},V.name))]}):(0,_.jsx)(ne,{value:G.database,placeholder:W?.database||"optional",onChange:V=>$(z.id,{database:V.target.value})})}),(0,_.jsxs)("div",{className:"dg-ws-actions",children:[(0,_.jsxs)(O,{size:"sm",variant:"primary",disabled:g===z.id||!G.connectionId,loading:g===z.id,onClick:()=>{H(z.id,z.path)},children:[(0,_.jsx)(k,{name:"link",size:11}),e("bindProject")]}),j?(0,_.jsx)(O,{size:"sm",variant:"danger",disabled:g===z.id,onClick:()=>{q(z.id)},children:e("unbindProject")}):null]})]})]},z.id)})})]})}var ke=require("react");var o=require("react/jsx-runtime");function nn(t){let{t:e,store:n}=t,i=be(n.catalog),d=`${t.connectionId}|${t.database}|${t.schema}`,[r,p]=(0,ke.useState)(""),[g,f]=(0,ke.useState)({column:"name",dir:"asc"});(0,ke.useEffect)(()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let v=(0,ke.useMemo)(()=>{let S=r.trim().toLowerCase();return(i.relations[d]??[]).filter($=>$.kind===t.kind).filter($=>S?$.name.toLowerCase().includes(S):!0).sort(($,H)=>{let q=g.dir==="desc"?-1:1;return g.column==="rows"?(($.rows??0)-(H.rows??0))*q:g.column==="comment"?($.comment||"").localeCompare(H.comment||"")*q:$.name.localeCompare(H.name)*q})},[i.relations,d,r,t.kind,g]),x=i.loading[d]===!0,B=i.errors[d]??"",T=(S,I,$)=>(0,o.jsxs)("th",{className:$,onClick:()=>f(H=>H.column===S?{column:S,dir:H.dir==="asc"?"desc":"asc"}:{column:S,dir:"asc"}),children:[I,g.column===S?(0,o.jsx)("span",{className:"dg-sortmark",children:g.dir==="desc"?"\u25BC":"\u25B2"}):null]});return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(k,{name:t.kind==="view"?"view":"table",size:12}),(0,o.jsx)("span",{children:t.kind==="view"?e("views"):e("tables")}),(0,o.jsx)("span",{className:"dg-chip",children:v.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(ne,{value:r,placeholder:e("search"),style:{width:180},onChange:S=>p(S.target.value)}),t.onNewQuery?(0,o.jsxs)(O,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,o.jsx)(k,{name:"play",size:10}),e("newQuery")]}):null,(0,o.jsx)(le,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema,!0)}})]}),B?(0,o.jsx)(fe,{tone:"error",children:B}):null,(0,o.jsx)("div",{className:"dg-grid-wrap",children:x?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):v.length===0?(0,o.jsx)(ve,{title:e("emptyTables")}):(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[T("name",e("name")),T("rows",e("rows"),"dg-num"),T("comment",e("comment")),(0,o.jsx)("th",{style:{width:70}})]})}),(0,o.jsx)("tbody",{children:v.map(S=>(0,o.jsxs)("tr",{onDoubleClick:()=>t.onOpen(S),children:[(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-list-name",children:[(0,o.jsx)(k,{name:S.kind==="view"?"view":"table",size:11}),(0,o.jsx)("span",{className:"dg-mono",children:S.name})]})}),(0,o.jsx)("td",{className:"dg-num",children:S.rows??"\u2014"}),(0,o.jsx)("td",{className:"dg-muted dg-truncate",title:S.comment,children:S.comment}),(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,o.jsx)(le,{icon:"play",title:e("openInQuery"),size:11,onClick:()=>t.onQuery(S)}),(0,o.jsx)(le,{icon:"table",title:e("data"),size:11,onClick:()=>t.onOpen(S)})]})})]},S.name))})]})})]})}function an(t){let{t:e,store:n}=t,i=be(n.connections),d=be(n.catalog),r=i.items.find(S=>S.id===t.connectionId),p=`${t.connectionId}|${t.database.name}|${t.schemas[0]??""}`,g=d.relations[p]??[],f=i.sessions[t.connectionId],v=r?r.engine!=="redis":!1;(0,ke.useEffect)(()=>{for(let S of t.schemas.length?t.schemas:[""])n.catalog.loadRelations(t.connectionId,t.database.name,S)},[t.connectionId,t.database.name,t.schemas,n]);let x=g.filter(S=>S.kind==="table").length,B=g.filter(S=>S.kind==="view").length,T=n.bindings().find(S=>S.connectionId===t.connectionId)??null;return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(k,{name:"database",size:12}),(0,o.jsx)("span",{className:"dg-mono",children:t.database.name}),(0,o.jsx)("span",{className:"dg-chip",children:r?.engine??""}),f?.version?(0,o.jsx)("span",{className:"dg-chip",children:f.version}):null,(0,o.jsx)("div",{className:"dg-spacer"}),v&&t.onNewQuery?(0,o.jsxs)(O,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,o.jsx)(k,{name:"play",size:10}),e("newQuery")]}):null]}),(0,o.jsxs)("div",{style:{overflow:"auto"},children:[(0,o.jsxs)("div",{className:"dg-cards",children:[(0,o.jsx)(Re,{hoverable:!0,onClick:()=>t.onOpenRelations("table"),style:{cursor:"pointer"},children:(0,o.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,o.jsx)("span",{className:"dg-stat-icon dg-stat-icon-blue",children:(0,o.jsx)(k,{name:"table",size:20})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"dg-card-value",children:x}),(0,o.jsx)("div",{className:"dg-card-label",children:e("tables")})]})]})}),(0,o.jsx)(Re,{hoverable:!0,onClick:()=>t.onOpenRelations("view"),style:{cursor:"pointer"},children:(0,o.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,o.jsx)("span",{className:"dg-stat-icon dg-stat-icon-green",children:(0,o.jsx)(k,{name:"view",size:20})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"dg-card-value",children:B}),(0,o.jsx)("div",{className:"dg-card-label",children:e("views")})]})]})}),(0,o.jsx)(Re,{hoverable:!0,children:(0,o.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,o.jsx)("span",{className:"dg-stat-icon dg-stat-icon-gold",children:(0,o.jsx)(k,{name:"folder",size:20})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"dg-card-value",children:t.schemas.length||1}),(0,o.jsx)("div",{className:"dg-card-label",children:e("schema")})]})]})}),(0,o.jsx)(Re,{hoverable:!0,children:(0,o.jsxs)("div",{className:"dg-stat-card-inner",children:[(0,o.jsx)("span",{className:"dg-stat-icon dg-stat-icon-purple",children:(0,o.jsx)(k,{name:"archive",size:20})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"dg-card-value",children:t.database.file?Qt(t.database.file.length):"\u2014"}),(0,o.jsx)("div",{className:"dg-card-label",children:e("file")})]})]})})]}),(0,o.jsx)("div",{className:"dg-section",children:(0,o.jsx)(Re,{size:"small",title:e("agentHint"),children:(0,o.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[T&&T.connectionId===t.connectionId?(0,o.jsx)(fe,{tone:"success",children:e("projectBound").replace("{name}",T.connectionName??T.connectionId).replace("{database}",T.database)}):(0,o.jsx)(fe,{children:e("projectUnbound")}),(0,o.jsx)(fe,{children:n.meta.allowWrites?e("writesEnabled"):e("readOnlyForAgent")})]})})}),(0,o.jsx)("div",{className:"dg-section",children:(0,o.jsx)(Re,{size:"small",title:e("schema"),children:t.schemas.length>0?(0,o.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:t.schemas.map(S=>(0,o.jsx)(Fe,{color:"blue",icon:"folder",children:(0,o.jsx)("span",{className:"dg-mono",children:S})},S))}):(0,o.jsx)("div",{className:"dg-muted",children:"default"})})})]})]})}function on(t){let{t:e,store:n}=t,i=be(n.catalog),d=`${t.connectionId}|${t.database}|${t.schema}`,r=i.routines[d]??[],[p,g]=(0,ke.useState)("");(0,ke.useEffect)(()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let f=r.find(v=>v.name===p)??null;return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(k,{name:"function",size:12}),(0,o.jsx)("span",{children:e("functions")}),(0,o.jsx)("span",{className:"dg-chip",children:r.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(le,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema,!0)}})]}),(0,o.jsxs)("div",{className:"dg-struct",style:{flex:1},children:[(0,o.jsx)("div",{className:"dg-struct-col",style:{flex:"0 0 46%"},children:(0,o.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:i.loading[d]?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):r.length===0?(0,o.jsx)(ve,{title:e("noRoutines")}):(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:e("name")}),(0,o.jsx)("th",{children:e("type")}),(0,o.jsx)("th",{children:e("returnType")})]})}),(0,o.jsx)("tbody",{children:r.map(v=>(0,o.jsxs)("tr",{className:v.name===p?"dg-row-active":"",onClick:()=>g(v.name),children:[(0,o.jsx)("td",{className:"dg-mono",children:v.name}),(0,o.jsx)("td",{children:v.kind==="function"?e("functionKind"):e("procedureKind")}),(0,o.jsx)("td",{className:"dg-muted dg-truncate",children:v.returnType||"\u2014"})]},`${v.kind}-${v.name}`))})]})})}),(0,o.jsxs)("div",{className:"dg-struct-col",children:[(0,o.jsx)("div",{className:"dg-struct-head",children:e("definition")}),(0,o.jsx)("div",{className:"dg-struct-body",children:f?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:"dg-row",style:{marginBottom:6},children:[(0,o.jsx)("span",{className:"dg-mono",children:f.name}),(0,o.jsx)("span",{className:"dg-tag",children:f.language||f.kind})]}),(0,o.jsx)("pre",{className:"dg-pre",children:f.definition||"\u2014"})]}):(0,o.jsx)("div",{className:"dg-muted",children:e("selectConnection")})})]})]})]})}function sn(t){let{t:e,store:n}=t,i=be(n.catalog),d=i.accounts[t.connectionId]??[];return(0,ke.useEffect)(()=>{n.catalog.loadAccounts(t.connectionId)},[t.connectionId,n]),(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(k,{name:"user",size:12}),(0,o.jsx)("span",{children:e("users")}),(0,o.jsx)("span",{className:"dg-chip",children:d.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(le,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadAccounts(t.connectionId,!0)}})]}),(0,o.jsx)("div",{className:"dg-grid-wrap",children:i.loading[t.connectionId]?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):d.length===0?(0,o.jsx)(ve,{title:e("noAccounts")}):(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:e("accountName")}),(0,o.jsx)("th",{children:e("accountHost")}),(0,o.jsx)("th",{children:e("accountPlugin")}),(0,o.jsx)("th",{children:e("accountPrivileged")}),(0,o.jsx)("th",{children:e("accountLocked")})]})}),(0,o.jsx)("tbody",{children:d.map(r=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"dg-mono",children:r.name}),(0,o.jsx)("td",{className:"dg-mono dg-muted",children:r.host}),(0,o.jsx)("td",{className:"dg-muted",children:r.plugin}),(0,o.jsx)("td",{children:r.privileged?"\u2713":""}),(0,o.jsx)("td",{children:r.locked?"\u2713":""})]},`${r.name}@${r.host}`))})]})})]})}function rn(t){let{t:e,store:n}=t,i=be(n.queries),d=be(n.connections),[r,p]=(0,ke.useState)("");(0,ke.useEffect)(()=>{i.items.length===0&&n.queries.load()},[i.items.length,n]);let g=r.trim().toLowerCase(),f=(0,ke.useMemo)(()=>{let v=new Map;for(let x of i.items){if(g&&!x.name.toLowerCase().includes(g)&&!x.sql.toLowerCase().includes(g))continue;let B=d.items.find(H=>H.id===x.connectionId),T=B?.name||x.connectionId||e("connections"),S=x.database||"default",I=`${T} / ${S}`,$=v.get(I)??{key:I,connectionId:x.connectionId,connectionName:T,engine:B?.engine,database:S,items:[]};$.items.push(x),v.set(I,$)}return[...v.values()].sort((x,B)=>x.key.localeCompare(B.key))},[i.items,d.items,g,e]);return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(k,{name:"bookmark",size:12}),(0,o.jsx)("span",{children:e("queries")}),(0,o.jsx)("span",{className:"dg-chip",children:i.items.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(ne,{value:r,placeholder:e("search"),style:{width:180},onChange:v=>p(v.target.value)}),(0,o.jsx)(le,{icon:"refresh",title:e("refresh"),onClick:()=>{n.queries.load()}})]}),i.error?(0,o.jsx)(fe,{tone:"error",children:i.error}):null,(0,o.jsx)("div",{className:"dg-grid-wrap",children:i.loading&&i.items.length===0?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):f.length===0?(0,o.jsx)(ve,{title:e("noQueries")}):(0,o.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:14,padding:"12px 16px"},children:f.map(v=>(0,o.jsxs)("div",{className:"dg-query-category",children:[(0,o.jsxs)("div",{className:"dg-query-category-head",children:[(0,o.jsx)("span",{className:"dg-query-category-icon",children:(0,o.jsx)(k,{name:"database",size:12})}),(0,o.jsx)("span",{className:"dg-query-category-title",children:v.connectionName}),v.engine?(0,o.jsx)("span",{className:"dg-badge",children:v.engine}):null,(0,o.jsx)("span",{className:"dg-query-category-sep",children:"/"}),(0,o.jsx)("span",{className:"dg-query-category-db",children:v.database}),(0,o.jsx)("span",{className:"dg-badge",style:{marginLeft:"auto"},children:v.items.length})]}),(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:e("queryName")}),(0,o.jsx)("th",{children:e("source")}),(0,o.jsx)("th",{children:e("updatedAt")}),(0,o.jsx)("th",{style:{width:96}})]})}),(0,o.jsx)("tbody",{children:v.items.map(x=>(0,o.jsxs)("tr",{onDoubleClick:()=>t.onOpen(x),children:[(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-list-name",children:[(0,o.jsx)(k,{name:"bookmark",size:11}),(0,o.jsx)("span",{style:{fontWeight:500},children:x.name})]})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{className:"dg-tag",children:x.scope})}),(0,o.jsx)("td",{className:"dg-muted",children:Vt(x.updatedAt)}),(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,o.jsx)(le,{icon:"play",title:e("openInEditor"),size:11,onClick:()=>t.onOpen(x)}),(0,o.jsx)(le,{icon:"trash",title:e("delete"),size:11,onClick:()=>{n.queries.remove(x.id).catch(B=>t.notify(String(B),"error"))}})]})})]},x.id))})]})]},v.key))})})]})}var ge=require("react");var N=require("react/jsx-runtime");function dn(t){let{t:e,tab:n}=t,[i,d]=(0,ge.useState)([]),[r,p]=(0,ge.useState)(Number(n.database.replace(/[^0-9]/g,""))||0),[g,f]=(0,ge.useState)("*"),[v,x]=(0,ge.useState)(""),[B,T]=(0,ge.useState)([]),[S,I]=(0,ge.useState)("0"),[$,H]=(0,ge.useState)(""),[q,z]=(0,ge.useState)(null),[j,G]=(0,ge.useState)(""),[W,se]=(0,ge.useState)(null),[V,Z]=(0,ge.useState)(""),[ee,w]=(0,ge.useState)(!1),[P,F]=(0,ge.useState)(()=>new Set),[R,Y]=(0,ge.useState)(null),[X,ae]=(0,ge.useState)("");(0,ge.useEffect)(()=>{J.redisDatabases(n.connectionId).then(a=>d(a.databases)).catch(()=>{})},[n.connectionId]);let pe=async a=>{try{let s=await J.redisScan({connectionId:n.connectionId,cursor:a?"0":S,pattern:g,type:v,database:r});T(m=>{let M=a?[]:m.slice(),U=new Set(M.map(ce=>ce.key));for(let ce of s.keys)U.has(ce.key)||M.push(ce);return M.sort((ce,ye)=>ce.key.localeCompare(ye.key))}),I(s.cursor),Z("")}catch(s){Z(s instanceof Error?s.message:String(s))}};(0,ge.useEffect)(()=>{T([]),H(""),z(null),pe(!0)},[n.connectionId,r]);let he=async a=>{H(a);try{z(await J.redisKey(n.connectionId,a,r)),Z("")}catch(s){z(null),Z(s instanceof Error?s.message:String(s))}},re=async a=>{w(!0);try{let s=await J.redisCommand(n.connectionId,a);se(s.reply),await pe(!0),$&&await he($),Z("")}catch(s){Z(s instanceof Error?s.message:String(s))}finally{w(!1)}},Ne=(0,ge.useMemo)(()=>{let a=new Map;for(let s of B){let m=s.key.indexOf(":"),M=m>0?s.key.slice(0,m):"",U=a.get(M)??[];U.push(s),a.set(M,U)}return[...a.entries()].sort((s,m)=>s[0]===""?1:m[0]===""?-1:s[0].localeCompare(m[0]))},[B]),b=()=>q?q.value===null||q.value===void 0?(0,N.jsx)(ve,{title:e("null")}):q.type==="string"?(0,N.jsx)("pre",{className:"dg-pre",style:{padding:9},children:String(q.value)}):q.type==="hash"?(0,N.jsx)("div",{className:"dg-grid-wrap",children:(0,N.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,N.jsx)("tbody",{children:Object.entries(q.value).map(([a,s])=>(0,N.jsxs)("tr",{children:[(0,N.jsx)("td",{className:"dg-mono",style:{width:"32%"},children:a}),(0,N.jsx)("td",{children:String(s)})]},a))})})}):Array.isArray(q.value)?(0,N.jsx)("div",{className:"dg-grid-wrap",children:(0,N.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,N.jsx)("tbody",{children:q.value.map((a,s)=>(0,N.jsxs)("tr",{children:[(0,N.jsx)("td",{className:"dg-rownum",children:s}),(0,N.jsx)("td",{className:"dg-mono",children:typeof a=="object"?JSON.stringify(a):String(a)})]},s))})})}):(0,N.jsx)("pre",{className:"dg-pre",style:{padding:9},children:JSON.stringify(q.value,null,2)}):(0,N.jsx)(ve,{title:e("keyValue")});return(0,N.jsxs)("div",{className:"dg-redis",children:[(0,N.jsxs)("div",{className:"dg-redis-list",children:[(0,N.jsxs)("div",{className:"dg-panehead",children:[(0,N.jsx)(k,{name:"database",size:11}),e("redisKeys"),(0,N.jsx)("div",{className:"dg-spacer"}),(0,N.jsx)(we,{value:String(r),onChange:a=>p(Number(a.target.value)),children:(i.length?i:[{name:"db0",schemas:[]}]).map(a=>(0,N.jsx)("option",{value:a.name.replace("db",""),children:a.name},a.name))}),(0,N.jsx)(le,{icon:"plus",title:e("newKey"),size:11,onClick:()=>{Y({kind:"new"}),ae("")}}),(0,N.jsx)(le,{icon:"refresh",title:e("refresh"),size:11,onClick:()=>{pe(!0)}})]}),(0,N.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,N.jsxs)("div",{className:"dg-search",children:[(0,N.jsx)(k,{name:"search",size:10}),(0,N.jsx)("input",{value:g,placeholder:e("redisPattern"),onChange:a=>f(a.target.value),onKeyDown:a=>a.key==="Enter"&&void pe(!0)})]}),(0,N.jsxs)(we,{value:v,onChange:a=>{x(a.target.value),pe(!0)},children:[(0,N.jsx)("option",{value:"",children:"any"}),["string","hash","list","set","zset","stream"].map(a=>(0,N.jsx)("option",{value:a,children:a},a))]})]}),(0,N.jsx)("div",{className:"dg-redis-keys",children:B.length===0?(0,N.jsx)("div",{className:"dg-muted",style:{padding:7},children:e("emptyObjects")}):Ne.map(([a,s])=>{let m=a===""||!P.has(a);return(0,N.jsxs)("div",{children:[a?(0,N.jsxs)("div",{className:"dg-rns",onClick:()=>F(M=>{let U=new Set(M);return U.has(a)?U.delete(a):U.add(a),U}),children:[(0,N.jsx)("span",{className:`dg-twist${m?" dg-twist-open":""}`,children:(0,N.jsx)(k,{name:"chevron",size:8})}),(0,N.jsx)(k,{name:"folder",size:10}),(0,N.jsxs)("span",{className:"dg-truncate",style:{flex:1},children:[a,":"]}),(0,N.jsx)("span",{className:"dg-badge",children:s.length})]}):null,m?s.map(M=>(0,N.jsxs)("div",{className:`dg-rkey${M.key===$?" dg-rkey-active":""}`,onClick:()=>{he(M.key)},title:M.key,children:[(0,N.jsx)("span",{className:"dg-truncate",style:{flex:1},children:a?M.key.slice(a.length+1):M.key}),(0,N.jsx)("span",{className:"dg-badge",children:M.type})]},M.key)):null]},a||"_")})}),S!=="0"?(0,N.jsx)("div",{className:"dg-pager",children:(0,N.jsx)(O,{size:"sm",onClick:()=>{pe(!1)},children:e("scanMore")})}):null]}),(0,N.jsxs)("div",{className:"dg-redis-detail",children:[V?(0,N.jsx)(fe,{tone:"error",onClose:()=>Z(""),children:V}):null,q?(0,N.jsxs)("div",{className:"dg-subbar",children:[(0,N.jsx)("span",{className:"dg-mono dg-truncate",title:q.key,children:q.key}),(0,N.jsx)("span",{className:"dg-tag",children:q.type}),(0,N.jsxs)("span",{className:"dg-chip",children:[e("ttl"),": ",q.ttl>0?`${q.ttl}s`:e("noTtl")]}),(0,N.jsx)("div",{className:"dg-spacer"}),(0,N.jsx)(O,{size:"sm",onClick:()=>{Y({kind:"rename"}),ae(q.key)},children:e("rename")}),(0,N.jsx)(O,{size:"sm",onClick:()=>{Y({kind:"ttl"}),ae(q.ttl>0?String(q.ttl):"3600")},children:e("setTtl")}),(0,N.jsx)(O,{size:"sm",onClick:()=>{Y({kind:"value"}),ae(String(q.value??""))},children:e("editValue")}),(0,N.jsx)(O,{size:"sm",variant:"danger",onClick:()=>{(async()=>{await J.redisDelete(n.connectionId,q.key,q.database??r),H(""),z(null),await pe(!0),t.notify(e("deleted"),"success")})()},children:e("deleteKey")})]}):null,(0,N.jsx)("div",{className:"dg-grid-wrap",children:b()}),(0,N.jsxs)("div",{className:"dg-redis-console",children:[(0,N.jsxs)("div",{className:"dg-row",children:[(0,N.jsx)(k,{name:"play",size:10}),(0,N.jsx)(ne,{value:j,placeholder:e("commandHint"),style:{flex:1},onChange:a=>G(a.target.value),onKeyDown:a=>a.key==="Enter"&&j.trim()&&void re(j)}),(0,N.jsx)(O,{size:"sm",variant:"primary",disabled:ee,onClick:()=>j.trim()&&void re(j),children:e("run")})]}),W!==null?(0,N.jsx)("pre",{className:"dg-pre",style:{maxHeight:110,overflow:"auto"},children:JSON.stringify(W,null,2)}):null]})]}),R?(0,N.jsx)(Te,{title:R.kind==="new"?e("newKey"):R.kind==="rename"?e("rename"):R.kind==="ttl"?e("setTtl"):e("editValue"),width:420,onClose:()=>Y(null),footer:(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(O,{onClick:()=>Y(null),children:e("cancel")}),(0,N.jsx)(O,{variant:"primary",onClick:()=>{(async()=>{let a=m=>m.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),s="";R.kind==="new"&&(s=`SET "${a(X)}" ""`),R.kind==="rename"&&q&&(s=`RENAME "${a(q.key)}" "${a(X)}"`),R.kind==="ttl"&&q&&(s=`EXPIRE "${a(q.key)}" ${Number.parseInt(X,10)||0}`),R.kind==="value"&&q&&(s=`SET "${a(q.key)}" "${a(X)}"`),s&&await re(s),Y(null),t.notify(e("saved"),"success")})()},children:e("save")})]}),children:(0,N.jsx)(oe,{label:R.kind==="ttl"?e("ttl"):R.kind==="value"?e("keyValue"):e("name"),children:(0,N.jsx)(ne,{value:X,autoFocus:!0,onChange:a=>ae(a.target.value)})})}):null]})}var ue=require("react");var D=require("react/jsx-runtime");function ln(t){let{t:e,tab:n}=t,[i,d]=(0,ue.useState)(n.initialSql??""),[r,p]=(0,ue.useState)(null),[g,f]=(0,ue.useState)(0),[v,x]=(0,ue.useState)(!1),[B,T]=(0,ue.useState)(""),[S,I]=(0,ue.useState)(""),[$,H]=(0,ue.useState)(null),[q,z]=(0,ue.useState)(0),[j,G]=(0,ue.useState)(!1),[W,se]=(0,ue.useState)(""),V=(0,ue.useRef)(null),Z=(0,ue.useRef)(null),ee=(0,ue.useMemo)(()=>i.split(`
`).length,[i]),w=(0,ue.useMemo)(()=>bt(i),[i]),P=(0,ue.useMemo)(()=>{let b=[];for(let a of t.tables)b.push({label:a,kind:"table"});for(let a of ft)b.push({label:a,kind:"fn"});for(let a of mt)b.push({label:a,kind:"kw"});return b},[t.tables]);(0,ue.useEffect)(()=>{n.initialSql&&d(n.initialSql)},[n.id,n.initialSql]);let F=b=>{let a=V.current;if(!a)return;let s=a.selectionStart,m=/([A-Za-z_][A-Za-z0-9_]*)$/.exec(i.slice(0,s))?.[1]??"";if(!m&&!b)return H(null);let M=m.toLowerCase(),U=new Set,ce=P.filter(De=>{let Ie=De.label.toLowerCase();return M&&!Ie.startsWith(M)||U.has(Ie)?!1:(U.add(Ie),!0)}).slice(0,14);if(ce.length===0)return H(null);let ye=Bt(a,s-m.length);H({items:ce,index:0,left:ye.left,top:ye.top+18,start:s-m.length,end:s})},R=()=>{if(!$)return;let b=$.items[$.index];if(!b)return;let a=$.start+b.label.length;d(`${i.slice(0,$.start)}${b.label}${i.slice($.end)}`),H(null),requestAnimationFrame(()=>{let s=V.current;s&&(s.focus(),s.selectionStart=s.selectionEnd=a)})},Y=async b=>{let a=b.trim();if(!a)return t.notify(e("noStatements"),"info");x(!0),T("");try{let s=await J.sql({connectionId:n.connectionId,database:n.database,sql:a});p(s),f(0);let m=s.results.find(U=>U.error),M=s.results[0];I(m?me(e("queryFailed"),{ms:s.durationMs}):me(e("queryOk"),{n:M?.rowCount??0,ms:s.durationMs})),s.results.some(U=>U.truncated)&&T(e("resultTruncated")),m?.error&&T(m.error)}catch(s){T(s instanceof Error?s.message:String(s)),p(null),I("")}finally{x(!1)}},X=async()=>{try{let b=await J.sqlCancel(n.connectionId);t.notify(b.cancelled?e("queryCancelled"):b.reason||e("cancelUnsupported"),b.cancelled?"info":"error")}catch(b){t.notify(b instanceof Error?b.message:String(b),"error")}},ae=()=>{let b=V.current;b&&b.selectionStart!==b.selectionEnd?Y(i.slice(b.selectionStart,b.selectionEnd)):Y(i)},pe=()=>{let b=i.split(";").map(a=>a.trim()).filter(Boolean)[0];if(!b)return t.notify(e("noStatements"),"info");Y(/^explain\b/i.test(b)?b:`EXPLAIN ${b}`)},he=b=>{if($){if(b.key==="ArrowDown")return b.preventDefault(),H({...$,index:($.index+1)%$.items.length});if(b.key==="ArrowUp")return b.preventDefault(),H({...$,index:($.index-1+$.items.length)%$.items.length});if(b.key==="Enter"||b.key==="Tab")return b.preventDefault(),R();if(b.key==="Escape")return b.preventDefault(),H(null)}if((b.ctrlKey||b.metaKey)&&b.key==="Enter")return b.preventDefault(),ae();if(b.ctrlKey&&b.key===" ")return b.preventDefault(),F(!0);if(b.key==="Tab"){b.preventDefault();let a=b.currentTarget,s=a.selectionStart,m=a.selectionEnd;d(`${i.slice(0,s)}  ${i.slice(m)}`),requestAnimationFrame(()=>{a.selectionStart=a.selectionEnd=s+2})}},re=r?.results[g]??null,Ne=()=>r?re?re.error?(0,D.jsxs)("div",{style:{padding:9},children:[(0,D.jsx)("div",{className:"dg-err",children:re.error}),(0,D.jsx)("pre",{className:"dg-pre",style:{marginTop:7,opacity:.7},children:re.statement})]}):re.columns.length===0?(0,D.jsxs)("div",{className:"dg-sqlmsg",children:[me(e("affected"),{n:re.affected??0})," \xB7 ",re.durationMs," ms"]}):(0,D.jsx)("div",{className:"dg-grid-wrap",children:(0,D.jsxs)("table",{className:"dg-grid",style:{width:"100%"},children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("th",{className:"dg-rownum",children:"#"}),re.columns.map(b=>(0,D.jsx)("th",{children:b.name},b.name))]})}),(0,D.jsx)("tbody",{children:re.rows.map((b,a)=>(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{className:"dg-rownum",children:a+1}),re.columns.map(s=>{let m=_e(b[s.name],e("null"));return(0,D.jsx)("td",{className:m.isNull?"dg-null":"",title:m.text,children:m.text},s.name)})]},a))})]})}):(0,D.jsx)(ve,{title:e("emptyResult")}):(0,D.jsx)(ve,{title:e("runHint"),hint:e("completionHint")});return(0,D.jsxs)("div",{className:"dg-sql",children:[(0,D.jsxs)("div",{className:"dg-sql-top",children:[(0,D.jsxs)("div",{className:"dg-editor",children:[(0,D.jsx)("div",{className:"dg-gutter","aria-hidden":!0,children:(0,D.jsx)("div",{style:{transform:`translateY(${-q}px)`},children:Array.from({length:ee},(b,a)=>a+1).join(`
`)})}),(0,D.jsxs)("div",{className:"dg-code",children:[(0,D.jsxs)("pre",{className:"dg-hl",ref:Z,"aria-hidden":!0,children:[w.map((b,a)=>b.type==="ws"?b.value:(0,D.jsx)("span",{className:`dg-tok dg-tok-${b.type==="plain"?"ident":b.type}`,children:b.value},a)),(0,D.jsx)("span",{children:"\u200B"})]}),(0,D.jsx)("textarea",{ref:V,className:"dg-sql-text",value:i,spellCheck:!1,placeholder:"SELECT * FROM ...",onChange:b=>{d(b.target.value),requestAnimationFrame(()=>F(!1))},onScroll:b=>{if(z(b.currentTarget.scrollTop),Z.current){let a=b.currentTarget;Z.current.scrollTop=a.scrollTop,Z.current.scrollLeft=a.scrollLeft}},onKeyDown:he,onBlur:()=>setTimeout(()=>H(null),120)}),$?(0,D.jsx)("div",{className:"dg-complete",style:{left:$.left,top:$.top},children:$.items.map((b,a)=>(0,D.jsxs)("div",{className:`dg-complete-item${a===$.index?" dg-complete-item-on":""}`,onMouseDown:s=>{s.preventDefault(),H({...$,index:a}),requestAnimationFrame(R)},children:[(0,D.jsx)("span",{children:b.label}),(0,D.jsx)("span",{className:"dg-complete-kind",children:b.kind})]},`${b.kind}-${b.label}`))}):null]})]}),(0,D.jsxs)("div",{className:"dg-sqlbar",children:[(0,D.jsxs)(O,{size:"sm",variant:"primary",disabled:v,onClick:ae,children:[v?(0,D.jsx)(xe,{}):(0,D.jsx)(k,{name:"play",size:10}),e("run")]}),v?(0,D.jsx)(O,{size:"sm",variant:"danger",onClick:()=>{X()},children:e("cancelQuery")}):null,(0,D.jsx)(O,{size:"sm",disabled:v,onClick:pe,children:e("explain")}),(0,D.jsxs)(O,{size:"sm",onClick:()=>d(Lt(i)),children:[(0,D.jsx)(k,{name:"wand",size:10}),e("beautify")]}),(0,D.jsxs)(O,{size:"sm",onClick:()=>{se(W||`Query ${new Date().toISOString().slice(0,16).replace("T"," ")}`),G(!0)},children:[(0,D.jsx)(k,{name:"bookmark",size:10}),e("saveQuery")]}),(0,D.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>{d(""),p(null),T(""),I("")},children:e("clear")}),(0,D.jsx)("span",{className:"dg-muted dg-hint",children:e("runHint")}),(0,D.jsx)("div",{className:"dg-spacer"}),S?(0,D.jsx)("span",{className:"dg-chip",children:S}):null]})]}),r&&r.results.length>1?(0,D.jsx)("div",{className:"dg-rtabs",children:r.results.map((b,a)=>(0,D.jsxs)("button",{type:"button",className:`dg-rtab${a===g?" dg-rtab-active":""}`,onClick:()=>f(a),children:[b.error?(0,D.jsx)(k,{name:"alert",size:10}):null,me(e("result"),{n:a+1})," \xB7 ",b.rowCount]},a))}):null,B&&!re?.error?(0,D.jsx)(fe,{tone:"error",onClose:()=>T(""),children:B}):null,(0,D.jsx)("div",{className:"dg-results",children:Ne()}),j?(0,D.jsxs)(Te,{title:e("saveQuery"),width:420,onClose:()=>G(!1),footer:(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(O,{onClick:()=>G(!1),children:e("cancel")}),(0,D.jsx)(O,{variant:"primary",onClick:()=>{(async()=>{try{await J.saveQuery({name:W.trim()||"Query",sql:i,connectionId:n.connectionId,database:n.database,scope:"user"}),G(!1),t.notify(e("querySaved"),"success"),t.onSaved()}catch(b){t.notify(b instanceof Error?b.message:String(b),"error")}})()},children:e("save")})]}),children:[(0,D.jsx)(oe,{label:e("queryName"),children:(0,D.jsx)(ne,{value:W,autoFocus:!0,onChange:b=>se(b.target.value)})}),(0,D.jsx)("pre",{className:"dg-pre",style:{maxHeight:160,overflow:"auto"},children:i})]}):null]})}var Q=require("react");var c=require("react/jsx-runtime"),On=[50,100,200,500];function Kn(t){let e=String(t??"").toLowerCase();if(/\b(json|jsonb|xml|text|clob|ntext|longtext|mediumtext|bytea)\b/.test(e))return!0;let n=/(?:var)?char(?:acter varying)?\s*\(\s*(\d+)\s*\)/.exec(e);return n?Number(n[1])>120:!1}function cn(t){let{t:e,tab:n,engine:i}=t,[d,r]=(0,Q.useState)("data"),p={connectionId:n.connectionId,database:n.database,schema:n.schema,table:n.table},g=`${p.connectionId}|${p.database}|${p.schema}|${p.table}`,[f,v]=(0,Q.useState)(null),[x,B]=(0,Q.useState)(""),[T,S]=(0,Q.useState)(0);return(0,Q.useEffect)(()=>{let I=!1;return J.describe(p.connectionId,p.database,p.schema,p.table).then($=>{I||(v($),B(""))}).catch($=>{I||B($ instanceof Error?$.message:String($))}),()=>{I=!0}},[g,T]),(0,c.jsxs)("div",{className:"dg-content",children:[(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsx)(k,{name:n.tableKind==="view"?"view":"table",size:12}),(0,c.jsx)("span",{className:"dg-mono",children:n.table}),(0,c.jsx)("span",{className:"dg-chip",children:n.database||"main"}),n.schema?(0,c.jsx)("span",{className:"dg-chip",children:n.schema}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(Yt,{value:d,onChange:r,options:[{value:"data",label:e("data")},{value:"structure",label:e("structure")}]})]}),d==="data"?(0,c.jsx)(Fn,{t:e,scope:p,engine:i,notify:t.notify,meta:f,onRefreshMeta:()=>S(I=>I+1),onNewQuery:t.onNewQuery}):(0,c.jsx)(jn,{t:e,meta:f,error:x,onRefresh:()=>S(I=>I+1)})]})}function Fn({t,scope:e,engine:n,notify:i,meta:d,onRefreshMeta:r,onNewQuery:p}){let[g,f]=(0,Q.useState)(1),[v,x]=(0,Q.useState)(100),[B,T]=(0,Q.useState)({column:"",dir:""}),[S,I]=(0,Q.useState)(""),[$,H]=(0,Q.useState)(!1),[q,z]=(0,Q.useState)([]),[j,G]=(0,Q.useState)("AND"),[W,se]=(0,Q.useState)(null),[V,Z]=(0,Q.useState)(!1),[ee,w]=(0,Q.useState)(""),[P,F]=(0,Q.useState)(null),[R,Y]=(0,Q.useState)(null),X=(0,Q.useRef)(null),[ae,pe]=(0,Q.useState)(0),[he,re]=(0,Q.useState)(null),[Ne,b]=(0,Q.useState)(!1),[a,s]=(0,Q.useState)([]),[m,M]=(0,Q.useState)(null),U=(0,Q.useRef)(null),[ce,ye]=(0,Q.useState)(!1),[De,Ie]=(0,Q.useState)(null),Et=(0,Q.useRef)(null),it=(0,Q.useRef)(!1),zt=(0,Q.useRef)(null),Rt=l=>{X.current=l,Y(l)},Be=l=>{U.current=l,M(l)},ot=`${e.connectionId}|${e.database}|${e.schema}|${e.table}`,[Qe,Ue]=(0,Q.useState)("");(0,Q.useEffect)(()=>{if(Qe===S)return;let l=setTimeout(()=>{I(Qe),f(1)},320);return()=>clearTimeout(l)},[Qe,S]);let st=(0,Q.useRef)(""),rt=(0,Q.useRef)(!1),dt=`${ot}|${S}|${B.column}|${B.dir}`;(0,Q.useEffect)(()=>{let l=new AbortController,y=!1;Z(!0),w("");let h=rt.current?"exact":st.current===dt?"none":"auto";return J.rows({...e,page:g,pageSize:v,orderBy:B.column,orderDir:B.dir,where:S,total:h},l.signal).then(C=>{y||(st.current=dt,rt.current=!1,X.current=null,Y(null),U.current=null,M(null),F(null),se(K=>({...C,total:typeof C.total=="number"?C.total:K?.total??C.rows.length,totalKind:C.totalKind==="none"&&K?K.totalKind:C.totalKind})))}).catch(C=>{y||C instanceof DOMException&&C.name==="AbortError"||(w(C instanceof Error?C.message:String(C)),se(null))}).finally(()=>{y||Z(!1)}),()=>{y=!0,l.abort()}},[ot,g,v,B.column,B.dir,S,ae,dt]);let Ee=d?.columns??[],Ve=(0,Q.useMemo)(()=>Ee.filter(l=>l.primaryKey).map(l=>l.name),[Ee]),It=(0,Q.useCallback)(l=>{let y={};for(let h of Ve)y[h]=l[h];return y},[Ve]),ze=W?.rows??[],Mt=W?.total??0,lt=Math.max(1,Math.ceil(Mt/v)),qe=Ve.length===0,We=(W?.columns??[]).filter(l=>!a.includes(l.name)),fn=Ee.length>0?Ee.map(l=>({name:l.name,type:l.type,primaryKey:!!l.primaryKey,nullable:l.nullable})):(W?.columns??[]).map(l=>({name:l.name,type:l.type??"",primaryKey:!1,nullable:!0})),Oe=(0,Q.useCallback)(()=>{st.current="",rt.current=!0,pe(l=>l+1),r()},[r]);(0,Q.useEffect)(()=>{F(null),Y(null)},[ot,g,v,S,ae]);let Ae=(0,Q.useMemo)(()=>{if(!P||!W)return null;let l=[],y=0;for(let C=P.top;C<=P.bottom;C+=1){let K=ze[C];if(K)for(let te=P.left;te<=P.right;te+=1){let ie=We[te];if(!ie)continue;y+=1;let de=Number(K[ie.name]);!Number.isNaN(de)&&K[ie.name]!==null&&l.push(de)}}if(l.length===0)return{cells:y,count:0,sum:0,avg:0};let h=l.reduce((C,K)=>C+K,0);return{cells:y,count:l.length,sum:h,avg:h/l.length}},[P,W,ze]),bn=l=>{T(y=>y.column!==l?{column:l,dir:"asc"}:y.dir==="asc"?{column:l,dir:"desc"}:{column:"",dir:""}),f(1)},vn=async()=>{if(!P||!W)return;let l=[];for(let y=P.top;y<=P.bottom;y+=1){let h=ze[y];h&&l.push(We.slice(P.left,P.right+1).map(C=>Ge(h[C.name])).join("	"))}try{await navigator.clipboard.writeText(l.join(`
`)),i(t("copied"),"success")}catch{i(t("error"),"error")}},Pt=async()=>{let l=X.current;if(X.current=null,Y(null),!l)return;let y=l.original===null||l.original===void 0?"":String(l.original);if(l.value!==y){if(qe)return i(t("noPrimaryKey"),"error");try{await J.updateRow({...e,key:l.key,changes:{[l.columnName]:l.value===""&&l.original===null?null:l.value}}),i(t("cellSaved"),"success"),Oe()}catch(h){i(h instanceof Error?h.message:String(h),"error")}}},hn=async l=>{let y=ze[l];if(!y||qe||!window.confirm(t("confirmDelete")))return;let h={};for(let C of Ve)h[C]=y[C];try{await J.deleteRow({...e,key:h}),i(t("deleted"),"success"),Oe()}catch(C){i(C instanceof Error?C.message:String(C),"error")}},Xe=async l=>{try{let y=await J.exportRows({...e,where:S,orderBy:B.column,orderDir:B.dir}),h=Ot(e.table);if(l==="csv"){let C=y.columns.map(te=>te.name),K=[C.map(Ge).join(",")].concat(y.rows.map(te=>C.map(ie=>Ge(te[ie])).join(","))).join(`\r
`);Je(`${h}.csv`,"text/csv",K)}else l==="json"?Je(`${h}.json`,"application/json",JSON.stringify(y.rows,null,2)):l==="insert"?Je(`${h}.sql`,"application/sql",Kt(n,e,y.columns,y.rows)):Je(`${h}.md`,"text/markdown",Ft(y.columns,y.rows));y.truncated&&i(me(t("exportTruncated"),{n:y.rows.length}),"info")}catch(y){i(y instanceof Error?y.message:String(y),"error")}},$t=200,yn=async l=>{let y=await l.text(),h=jt(y);if(h.errors.length>0){i(me(t("importFailed"),{n:0,error:h.errors.slice(0,3).join("; ")}),"error");return}if(h.header.length===0||h.rows.length===0){i(t("importEmpty"),"error");return}let C=new Set((Ee.length?Ee:W?.columns??[]).map(de=>de.name));if(C.size===0){i(t("importNoColumns"),"error");return}let K=h.header.filter(de=>!C.has(de));if(K.length>0){i(me(t("importUnknownColumns"),{cols:K.join(", ")}),"error");return}let te=h.rows.map(de=>{let Me={};return h.header.forEach((gt,Cn)=>{let Dt=de[Cn]??"";Me[gt]=Dt===""?null:Dt}),Me});b(!0);let ie=0;try{for(let de=0;de<te.length;de+=$t){let Me=te.slice(de,de+$t),gt=await J.insertRows({...e,rows:Me});ie+=gt.inserted}i(me(t("importDone"),{n:ie}),"success"),Oe()}catch(de){let Me=de instanceof Error?de.message:String(de);i(me(t("importFailed"),{n:ie,error:Me}),"error")}finally{b(!1)}},xn=async()=>{try{let l=await J.insertRow({...e,values:{}});i(l.affected>0?t("rowInserted"):t("insertRowFailed"),l.affected>0?"success":"error"),Oe()}catch(l){i(l instanceof Error?l.message:String(l),"error")}},wn=l=>{let y=ze[l];if(!y||qe)return;if(V)return i(t("loading"),"info");let h=(W?.columns??[]).map(te=>te.name),C={},K={};for(let te of h){let ie=y[te];K[te]=ie,C[te]=ie==null?"":String(ie)}Be({key:It(y),original:K,draft:C,fields:h})},kn=async()=>{let l=U.current;if(!l)return;let y={};for(let h of l.fields){let C=l.original[h],K=C==null?"":String(C),te=l.draft[h]??"";if(te===K)continue;let ie=Ee.find(de=>de.name===h);y[h]=te===""&&(ie?.nullable??!0)?null:te}if(Object.keys(y).length===0){Be(null);return}ye(!0);try{await J.updateRow({...e,key:l.key,changes:y}),i(t("rowSaved"),"success"),Be(null),Oe()}catch(h){i(h instanceof Error?h.message:String(h),"error")}finally{ye(!1)}},ct=(l,y,h)=>{F(C=>h&&C?{top:Math.min(C.top,l),left:Math.min(C.left,y),bottom:Math.max(C.bottom,l),right:Math.max(C.right,y)}:{top:l,left:y,bottom:l,right:y})},Nn=l=>{if((l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="c"){l.preventDefault(),vn();return}if(!P)return;let h={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[l.key];if(!h)return;l.preventDefault();let C=Math.max(0,Math.min(ze.length-1,P.top+h[0])),K=Math.max(0,Math.min(We.length-1,P.left+h[1]));ct(C,K,l.shiftKey)},Sn=We.map((l,y)=>(0,c.jsxs)("th",{className:B.column===l.name?"dg-th-sorted":"",onClick:()=>bn(l.name),title:l.name,children:[l.name,B.column===l.name?(0,c.jsx)("span",{className:"dg-sortmark",children:B.dir==="desc"?"\u25BC":"\u25B2"}):null,Ve.includes(l.name)?(0,c.jsx)("span",{className:"dg-colkey",title:t("primaryKey"),children:(0,c.jsx)(k,{name:"key",size:10})}):null,(0,c.jsx)("span",{className:"dg-colresize",onMouseDown:h=>{h.stopPropagation();let C=h.clientX,K=h.target.parentElement,te=K?.offsetWidth??160,ie=Me=>{K&&(K.style.width=`${Math.max(60,te+Me.clientX-C)}px`)},de=()=>{window.removeEventListener("mousemove",ie),window.removeEventListener("mouseup",de)};window.addEventListener("mousemove",ie),window.addEventListener("mouseup",de)},onClick:h=>h.stopPropagation()})]},l.name));return(0,c.jsxs)("div",{className:"dg-content",children:[qe?(0,c.jsx)(fe,{tone:"info",children:t("noPrimaryKey")}):null,ee?(0,c.jsx)(fe,{tone:"error",onClose:()=>w(""),children:ee}):null,(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsxs)(O,{size:"sm",active:!!S,onClick:()=>{let l=vt(n,{joiner:j,conditions:q});Ue(l),I(l),f(1)},children:[(0,c.jsx)(k,{name:"filter",size:11}),t("filter")]}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>H(l=>!l),children:t("filterBuilder")}),(0,c.jsx)(ne,{value:Qe,placeholder:t("rawWhere"),style:{flex:1,minWidth:120,maxWidth:380},onChange:l=>Ue(l.target.value),onKeyDown:l=>{l.key==="Enter"&&(I(Qe),f(1))}}),S?(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>{Ue(""),I(""),z([]),f(1)},children:t("clear")}):null,p&&n!=="redis"?(0,c.jsxs)(O,{size:"sm",variant:"tonal",onClick:p,title:t("newQuery"),children:[(0,c.jsx)(k,{name:"play",size:10}),t("newQuery")]}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsxs)("span",{className:"dg-chip",title:W?.totalKind==="estimate"?t("estimatedTotal"):void 0,children:[W?.totalKind==="estimate"?"\u2248 ":"",(0,c.jsx)("b",{children:Mt})," ",t("rows")]}),(0,c.jsx)(le,{icon:"refresh",title:t("refresh"),onClick:Oe}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:()=>{xn()},children:t("insertRow")}),(0,c.jsx)("input",{ref:Et,type:"file",accept:".csv,text/csv",style:{display:"none"},onChange:l=>{let y=l.target.files?.[0];y&&yn(y),l.target.value=""}}),(0,c.jsxs)(O,{size:"sm",variant:"ghost",disabled:Ne,onClick:()=>Et.current?.click(),children:[Ne?(0,c.jsx)(xe,{}):null,t("importCsv")]}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:l=>{let y=l.currentTarget.getBoundingClientRect();Ie({x:y.left,y:y.bottom+2})},children:t("columnChooser")}),(0,c.jsx)(O,{size:"sm",variant:"ghost",onClick:l=>{let y=l.currentTarget.getBoundingClientRect();re({x:y.left,y:y.bottom+2})},children:t("exportAs")})]}),$?(0,c.jsxs)("div",{className:"dg-subbar",style:{gap:6,flexWrap:"wrap"},children:[(0,c.jsxs)(we,{value:j,onChange:l=>G(l.target.value),children:[(0,c.jsx)("option",{value:"AND",children:t("matchAll")}),(0,c.jsx)("option",{value:"OR",children:t("matchAny")})]}),q.map((l,y)=>(0,c.jsxs)("span",{className:"dg-row",style:{gap:3},children:[(0,c.jsx)(we,{value:l.column,onChange:h=>z(C=>C.map((K,te)=>te===y?{...K,column:h.target.value}:K)),children:Ee.map(h=>(0,c.jsx)("option",{value:h.name,children:h.name},h.name))}),(0,c.jsx)(we,{value:l.op,onChange:h=>z(C=>C.map((K,te)=>te===y?{...K,op:h.target.value}:K)),children:Ht.map(h=>(0,c.jsx)("option",{value:h,children:h},h))}),(0,c.jsx)(ne,{value:l.value,style:{width:120},onChange:h=>z(C=>C.map((K,te)=>te===y?{...K,value:h.target.value}:K))}),(0,c.jsx)(le,{icon:"x",title:t("delete"),size:10,onClick:()=>z(h=>h.filter((C,K)=>K!==y))})]},y)),(0,c.jsxs)(O,{size:"sm",onClick:()=>z(l=>l.concat({column:Ee[0]?.name??"",op:"=",value:""})),children:[(0,c.jsx)(k,{name:"plus",size:10}),t("addCondition")]}),(0,c.jsx)(O,{size:"sm",variant:"primary",onClick:()=>{let l=vt(n,{joiner:j,conditions:q});Ue(l),I(l),f(1)},children:t("apply")})]}):null,(0,c.jsxs)("div",{className:"dg-grid-wrap",children:[V&&!W?(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(xe,{label:t("loading")})}):null,W&&ze.length===0?(0,c.jsx)(ve,{title:t("emptyTable")}):null,W&&ze.length>0?(0,c.jsxs)("table",{className:"dg-grid",ref:zt,tabIndex:0,onKeyDown:Nn,children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"dg-rownum",children:"#"}),Sn,(0,c.jsx)("th",{style:{width:26}})]})}),(0,c.jsx)("tbody",{children:ze.map((l,y)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:`dg-rownum${qe?"":" dg-rownum-editable"}`,title:qe?void 0:t("editRow"),onClick:()=>wn(y),children:(g-1)*v+y+1}),We.map((h,C)=>{let K=_e(l[h.name],t("null")),te=P&&y>=P.top&&y<=P.bottom&&C>=P.left&&C<=P.right;return R&&R.rowIndex===y&&R.columnName===h.name?(0,c.jsx)("td",{className:"dg-cell-editing",children:(0,c.jsx)("input",{autoFocus:!0,value:R.value,onChange:ie=>Rt({...R,value:ie.target.value}),onBlur:()=>{Pt()},onKeyDown:ie=>{ie.key==="Enter"&&(ie.preventDefault(),Pt()),ie.key==="Escape"&&(X.current=null,Y(null))}})},h.name):(0,c.jsx)("td",{className:`${te?"dg-cell-selected":""}${K.isNull?" dg-null":""}${/int|numeric|decimal|real|double|float|money/i.test(h.type??"")?" dg-cell-num":""}`,title:K.isNull?t("null"):K.text,onMouseDown:ie=>{it.current=!0,zt.current?.focus(),ct(y,C,ie.shiftKey);let de=()=>{it.current=!1,window.removeEventListener("mouseup",de)};window.addEventListener("mouseup",de)},onMouseEnter:()=>{it.current&&ct(y,C,!1)},onDoubleClick:()=>{if(qe)return i(t("noPrimaryKey"),"error");if(V)return i(t("loading"),"info");Rt({rowIndex:y,columnName:h.name,key:It(l),original:l[h.name],value:K.isNull?"":String(l[h.name])})},children:K.text},h.name)}),(0,c.jsx)("td",{children:(0,c.jsx)(le,{icon:"trash",title:t("deleteRow"),size:11,onClick:()=>{hn(y)}})})]},y))})]}):null]}),(0,c.jsxs)("div",{className:"dg-pager",children:[(0,c.jsx)(le,{icon:"chevronLeft",title:t("prev"),size:11,disabled:g<=1,onClick:()=>f(l=>Math.max(1,l-1))}),(0,c.jsx)("span",{children:me(t("page"),{page:g,pages:lt})}),(0,c.jsx)(le,{icon:"chevron",title:t("next"),size:11,disabled:g>=lt,onClick:()=>f(l=>Math.min(lt,l+1))}),(0,c.jsx)("div",{className:"dg-spacer"}),Ae&&Ae.cells>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"dg-chip",children:me(t("selection"),{n:Ae.cells})}),Ae.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("sum")," ",(0,c.jsx)("b",{children:Ae.sum.toFixed(2)})]}):null,Ae.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("avg")," ",(0,c.jsx)("b",{children:Ae.avg.toFixed(2)})]}):null]}):null,(0,c.jsx)("span",{children:t("pageSize")}),(0,c.jsx)(we,{value:String(v),onChange:l=>{x(Number(l.target.value)),f(1)},children:On.map(l=>(0,c.jsx)("option",{value:String(l),children:l},l))})]}),De?(0,c.jsx)(je,{x:De.x,y:De.y,onClose:()=>Ie(null),items:[...(W?.columns??[]).map(l=>{let y=!a.includes(l.name);return{label:l.name,icon:y?"check":void 0,onClick:()=>s(h=>h.includes(l.name)?h.filter(C=>C!==l.name):h.concat(l.name))}}),...a.length>0?[{separator:!0},{label:t("showAll"),icon:"columns",onClick:()=>s([])}]:[]]}):null,he?(0,c.jsx)(je,{x:he.x,y:he.y,onClose:()=>re(null),items:[{label:t("exportCsv"),onClick:()=>{Xe("csv")}},{label:t("exportJson"),onClick:()=>{Xe("json")}},{label:t("exportInsert"),onClick:()=>{Xe("insert")}},{label:t("exportMarkdown"),onClick:()=>{Xe("markdown")}}]}):null,m?(0,c.jsx)(Te,{title:`${t("editRow")} \xB7 ${Object.values(m.key).map(l=>String(l)).join(", ")}`,width:560,busy:ce,onClose:()=>Be(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(O,{onClick:()=>Be(null),children:t("cancel")}),(0,c.jsx)(O,{variant:"primary",disabled:ce,onClick:()=>{kn()},children:t("save")})]}),children:(0,c.jsx)("div",{className:"dg-form",children:fn.map(l=>{let y=m.draft[l.name]??"",h=C=>{let K=U.current;K&&Be({...K,draft:{...K.draft,[l.name]:C}})};return(0,c.jsx)(oe,{label:`${l.name}${l.primaryKey?" \xB7 PK":""}`,children:Kn(l.type)?(0,c.jsx)(et,{rows:3,value:y,onChange:C=>h(C.target.value)}):(0,c.jsx)(ne,{value:y,placeholder:l.nullable?t("null"):"",onChange:C=>h(C.target.value)})},l.name)})})}):null]})}function jn({t,meta:e,error:n,onRefresh:i}){let d=e;return n?(0,c.jsx)(fe,{tone:"error",children:n}):d?(0,c.jsxs)("div",{className:"dg-struct",children:[(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-fields",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("columns"),(0,c.jsx)("span",{className:"dg-badge",children:d.columns.length}),(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(le,{icon:"refresh",title:t("refresh"),size:11,onClick:i})]}),(0,c.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:(0,c.jsxs)("table",{className:"dg-grid dg-grid-fixed",style:{width:"100%"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{style:{width:"30%"},children:t("name")}),(0,c.jsx)("th",{style:{width:"34%"},children:t("type")}),(0,c.jsx)("th",{style:{width:"12%"},children:t("nullable")}),(0,c.jsx)("th",{style:{width:"24%"},children:t("default")})]})}),(0,c.jsx)("tbody",{children:d.columns.map(r=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsxs)("span",{className:"dg-row",children:[r.primaryKey?(0,c.jsx)(k,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono dg-truncate",children:r.name})]})}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:r.type,children:r.type}),(0,c.jsx)("td",{children:r.nullable?"YES":"NO"}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:r.defaultValue??"",children:r.defaultValue===null?"\u2014":String(r.defaultValue)})]},r.name))})]})})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-indexes",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("indexes"),(0,c.jsx)("span",{className:"dg-badge",children:d.indexes.length})]}),(0,c.jsx)("div",{className:"dg-struct-body",children:d.indexes.length===0?(0,c.jsx)("div",{className:"dg-muted",children:t("noIndexes")}):d.indexes.map(r=>(0,c.jsxs)("div",{className:"dg-idx",children:[r.primary?(0,c.jsx)(k,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono",children:r.name}),(0,c.jsx)("span",{className:"dg-tag",children:r.unique?"unique":"index"}),(0,c.jsx)("span",{className:"dg-muted dg-truncate",children:r.columns.join(", ")})]},r.name))})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-ddl",children:[(0,c.jsx)("div",{className:"dg-struct-head",children:t("ddl")}),(0,c.jsx)("div",{className:"dg-struct-body",children:(0,c.jsx)("pre",{className:"dg-pre",children:d.ddl||"\u2014"})})]})]}):(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(xe,{label:t("loading")})})}function gn(t,e){return`SELECT * FROM ${Ke(t,e)} LIMIT 100;`}var He=require("react");var A=require("react/jsx-runtime"),Qn={red:"var(--dsw-alias-state-error-primary)",yellow:"var(--dsw-alias-state-warn-primary)",green:"var(--dsw-alias-state-success-primary)"};function un(t){let{store:e,t:n}=t,i=be(e.connections),d=be(e.catalog),[r,p]=(0,He.useState)(""),[g,f]=(0,He.useState)(()=>new Set),[v,x]=(0,He.useState)(()=>new Set),[B,T]=(0,He.useState)(()=>new Set),S=(w,P)=>P(F=>{let R=new Set(F);return R.has(w)?R.delete(w):R.add(w),R}),I=r.trim().toLowerCase(),$=(0,He.useMemo)(()=>{let w=new Map;for(let P of i.items){let F=P.group||n("noGroups"),R=w.get(F)??[];R.push(P),w.set(F,R)}return[...w.entries()].sort((P,F)=>P[0].localeCompare(F[0]))},[i.items,n]),H=async w=>{e.connections.select(w.id);let P=e.connections.session(w.id).status;if(P==="open"||P==="opening"){S(w.id,f);return}f(F=>new Set(F).add(w.id)),await e.connections.connect(w.id)},q=async(w,P)=>{t.onSelectDatabase(w,P);let F=`${w.id}|${P.name}`;x(R=>new Set(R).add(F)),w.engine!=="redis"&&await e.catalog.loadRelations(w.id,P.name,P.schemas[0]??"")},z=(w,P,F,R)=>(0,A.jsxs)("div",{className:"dg-trow",style:{paddingLeft:F?54:40},title:`${R.name}${R.rows!==null?` \xB7 ${R.rows} rows`:""}`,onClick:()=>t.onOpenTable(w,P,F,R),children:[(0,A.jsx)("span",{className:"dg-twist"}),(0,A.jsx)("span",{className:"dg-ticon",children:(0,A.jsx)(k,{name:R.kind==="view"?"view":"table",size:11})}),(0,A.jsx)("span",{className:"dg-tlabel",children:R.name}),R.rows!==null?(0,A.jsx)("span",{className:"dg-badge",children:R.rows}):null]},`${w.id}|${P.name}|${F}|${R.name}`),j=(w,P)=>{let F=`${w.id}|${P.name}`,R=v.has(F),Y=P.schemas.length?P.schemas:[""];return(0,A.jsxs)("div",{children:[(0,A.jsxs)("div",{className:`dg-trow dg-trow-db${t.selectedDatabaseKey===F?" dg-trow-active":""}`,style:{paddingLeft:26},title:P.name,onClick:()=>{q(w,P)},onContextMenu:X=>{X.preventDefault(),t.onDatabaseMenu(X,w,P)},children:[(0,A.jsx)("span",{className:`dg-twist${R?" dg-twist-open":""}`,onClick:X=>{X.stopPropagation(),S(F,x),!R&&w.engine!=="redis"&&e.catalog.loadRelations(w.id,P.name,Y[0]??"")},children:(0,A.jsx)(k,{name:"chevron",size:9})}),(0,A.jsx)("span",{className:"dg-ticon",children:(0,A.jsx)(k,{name:"database",size:11})}),(0,A.jsx)("span",{className:"dg-tlabel",children:P.name}),P.schemas.length>1?(0,A.jsx)("span",{className:"dg-badge",children:P.schemas.length}):null]}),R?Y.map(X=>{let ae=`${F}|${X}`,pe=!X||B.has(ae),he=d.relations[`${w.id}|${P.name}|${X}`]??[],re=d.loading[`${w.id}|${P.name}|${X}`]===!0;return(0,A.jsxs)("div",{children:[X?(0,A.jsxs)("div",{className:"dg-trow",style:{paddingLeft:40},onClick:()=>{S(ae,T),pe||e.catalog.loadRelations(w.id,P.name,X)},children:[(0,A.jsx)("span",{className:`dg-twist${pe?" dg-twist-open":""}`,children:(0,A.jsx)(k,{name:"chevron",size:9})}),(0,A.jsx)("span",{className:"dg-ticon",children:(0,A.jsx)(k,{name:"folder",size:11})}),(0,A.jsx)("span",{className:"dg-tlabel",children:X})]}):null,pe?re&&he.length===0?(0,A.jsx)("div",{className:"dg-muted",style:{padding:`2px 8px 2px ${(X?54:40)+16}px`},children:n("loading")}):he.map(Ne=>z(w,P,X,Ne)):null]},X||"_default")}):null]},F)},[G,W]=(t.selectedDatabaseKey||"").split("|"),se=i.items.find(w=>w.id===G),V=se?se.engine!=="redis":!1,Z=!!(se&&W&&V),ee=se&&W?e.connections.session(se.id).databases.find(w=>w.name===W)??{name:W,schemas:[""]}:null;return(0,A.jsxs)("div",{className:"dg-tree",children:[(0,A.jsxs)("div",{className:"dg-panehead",children:[(0,A.jsx)(k,{name:"database",size:11}),n("connections"),(0,A.jsx)("span",{className:"dg-badge",children:i.items.length}),(0,A.jsx)("div",{className:"dg-spacer"}),t.onNewConnection?(0,A.jsx)(le,{icon:"plus",title:n("newConnection"),size:11,onClick:t.onNewConnection}):null,t.onOpenWorkspaces?(0,A.jsx)(le,{icon:"link",title:n("workspaces"),size:11,onClick:t.onOpenWorkspaces}):null,(0,A.jsx)(le,{icon:"refresh",title:n("refresh"),size:11,onClick:()=>{e.connections.load(),e.meta.load()}})]}),(0,A.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,A.jsxs)("div",{className:"dg-search",children:[(0,A.jsx)(k,{name:"search",size:10}),(0,A.jsx)("input",{value:r,placeholder:n("search"),onChange:w=>p(w.target.value)})]}),Z&&t.onNewQuery&&se&&ee?(0,A.jsxs)(O,{size:"sm",variant:"tonal",title:n("newQuery"),onClick:()=>t.onNewQuery?.(se,ee),children:[(0,A.jsx)(k,{name:"play",size:10}),n("newQuery")]}):null]}),(0,A.jsxs)("div",{className:"dg-tree-scroll",children:[i.loading&&i.items.length===0?(0,A.jsx)("div",{className:"dg-muted",style:{padding:8},children:n("loading")}):null,i.error?(0,A.jsx)("div",{className:"dg-banner dg-banner-error",children:i.error}):null,$.map(([w,P])=>{let F=P.filter(R=>!I||R.name.toLowerCase().includes(I)?!0:e.connections.session(R.id).databases.some(X=>X.name.toLowerCase().includes(I)));return F.length===0?null:(0,A.jsxs)("div",{children:[(0,A.jsxs)("div",{className:"dg-group",children:[(0,A.jsx)("span",{className:"dg-twist"}),(0,A.jsx)("span",{className:"dg-truncate",children:w}),(0,A.jsx)("span",{className:"dg-badge",children:F.length})]}),F.map(R=>{let Y=e.connections.session(R.id),X=g.has(R.id)&&Y.status==="open";return(0,A.jsxs)("div",{children:[(0,A.jsxs)("div",{className:`dg-trow${i.activeId===R.id?" dg-trow-active":""}`,style:{paddingLeft:12},onClick:()=>{H(R)},onContextMenu:ae=>{ae.preventDefault(),t.onConnectionMenu(ae,R)},title:`${R.name} \xB7 ${R.engine}`,children:[(0,A.jsx)("span",{className:`dg-twist${X?" dg-twist-open":""}`,children:(0,A.jsx)(k,{name:"chevron",size:9})}),R.color!=="none"?(0,A.jsx)("span",{className:"dg-colorbar",style:{background:Qn[R.color]}}):null,(0,A.jsx)("span",{className:"dg-ticon",children:(0,A.jsx)(k,{name:"database",size:12})}),(0,A.jsx)("span",{className:"dg-tlabel",children:R.name}),(0,A.jsx)("span",{className:"dg-badge",children:R.engine}),(0,A.jsx)(Gt,{status:Y.status})]}),Y.status==="opening"?(0,A.jsxs)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 34px"},children:[n("connect"),"\u2026"]}):null,Y.status==="error"?(0,A.jsx)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 34px"},children:Y.error||n("error")}):null,X?Y.databases.map(ae=>j(R,ae)):null]},R.id)})]},w)}),!i.loading&&i.items.length===0?(0,A.jsx)("div",{className:"dg-muted dg-hint",style:{padding:10},children:n("selectConnection")}):null]})]})}var L=require("react/jsx-runtime"),Vn=[{id:"tables",labelKey:"tables",icon:"table",target:"relations",relation:"table"},{id:"views",labelKey:"views",icon:"view",target:"relations",relation:"view"},{id:"functions",labelKey:"functions",icon:"function",target:"routines"},{id:"users",labelKey:"users",icon:"user",target:"accounts"},{id:"queries",labelKey:"queries",icon:"bookmark",target:"queries"}];function pn({t}){let e=t??(a=>a),[n]=(0,Ce.useState)(()=>new Ze),i=be(n.connections),d=be(n.meta),r=be(n.tabs),[p,g]=(0,Ce.useState)(null),[f,v]=(0,Ce.useState)(null),[x,B]=(0,Ce.useState)(null),[T,S]=(0,Ce.useState)(null),[I,$]=(0,Ce.useState)(null),[H,q]=(0,Ce.useState)(262);(0,Ce.useEffect)(()=>{n.bootstrap()},[n]),(0,Ce.useEffect)(()=>{if(!I)return;let a=setTimeout(()=>$(null),3600);return()=>clearTimeout(a)},[I]);let z=(a,s="info")=>$({message:a,tone:s}),j=a=>i.items.find(s=>s.id===a),G=a=>j(a)?.engine??"sqlite",W=(a,s)=>{let m=s.schemas[0]??"";if(g({connectionId:a.id,database:s.name,schema:m}),a.engine==="redis"){n.tabs.open({id:`redis:${a.id}:${s.name}`,kind:"redis",connectionId:a.id,database:s.name,title:s.name});return}n.catalog.loadRelations(a.id,s.name,m),n.tabs.open({id:`relations:${a.id}:${s.name}:${m}:table`,kind:"relations",connectionId:a.id,database:s.name,schema:m,relation:"table",title:s.name})},se=(a,s)=>{g({connectionId:a.id,database:s.name,schema:s.schemas[0]??""}),n.tabs.open({id:`overview:${a.id}:${s.name}`,kind:"overview",connectionId:a.id,database:s.name,title:s.name})},V=(a,s,m,M)=>{n.tabs.open({id:`table:${a.id}:${s}:${m}:${M.name}`,kind:"table",connectionId:a.id,database:s,schema:m,table:M.name,tableKind:M.kind,title:M.name})},Z=(a,s="table",m=p)=>{if(a==="queries"){n.tabs.open({id:"queries",kind:"queries",connectionId:"",database:"",schema:"",title:e("queries")});return}if(!m)return z(e("selectDatabase"),"info");if(a==="accounts"){n.tabs.open({id:`accounts:${m.connectionId}`,kind:"accounts",connectionId:m.connectionId,database:m.database,schema:"",title:e("users")});return}if(a==="relations"){n.tabs.open({id:`relations:${m.connectionId}:${m.database}:${m.schema}:${s}`,kind:"relations",connectionId:m.connectionId,database:m.database,schema:m.schema,relation:s,title:m.database});return}n.tabs.open({id:`${a}:${m.connectionId}:${m.database}:${m.schema}`,kind:a,connectionId:m.connectionId,database:m.database,schema:m.schema,title:e(a==="routines"?"functions":"users")})},ee=(a,s,m)=>{let M=a??(p?j(p.connectionId):null);if(!M||M.engine==="redis")return;let U=s??(p&&p.connectionId===M.id?p.database:n.connections.session(M.id).databases[0]?.name??"");if(!U)return;let ce=r.tabs.filter(ye=>ye.kind==="sql").length+1;n.tabs.open({id:`sql:${M.id}:${U}:${Date.now()}`,kind:"sql",connectionId:M.id,database:U,title:`${e("query")} ${ce} (${U})`,initialSql:m??""})},w=a=>{let s=j(a.connectionId)??i.items[0];if(!s)return v({kind:"connection"});n.tabs.open({id:`sql:saved:${a.id}:${Date.now()}`,kind:"sql",connectionId:s.id,database:a.database,title:a.name,initialSql:a.sql})},P=async a=>{let s=f&&f.kind==="connection"?f.initial:void 0;if(s)await n.connections.update(s.id,a),n.tabs.closeConnection(s.id),z(e("saved"),"success");else{let m=await n.connections.create(a);z(m.ok?me(e("testOk"),{version:m.serverVersion??"",ms:m.latencyMs??0}):e("saved"),m.ok?"success":"info")}v(null)},F=(a,s)=>{let m=n.connections.session(s.id).status;S({x:a.clientX,y:a.clientY,items:[m==="open"?{label:e("disconnect"),icon:"unplug",onClick:()=>{n.connections.disconnect(s.id)}}:{label:e("connect"),icon:"plug",onClick:()=>{n.connections.connect(s.id)}},{label:e("test"),icon:"check",onClick:()=>{n.connections.test(s.id).then(M=>z(me(e("testOk"),{version:M.serverVersion??"",ms:M.latencyMs??0}),"success"),M=>z(M instanceof Error?M.message:String(M),"error"))}},{separator:!0},...s.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>ee(s)}]:[],{label:e("edit"),icon:"pencil",onClick:()=>v({kind:"connection",initial:s})},{label:e("refresh"),icon:"refresh",onClick:()=>{n.connections.reloadDatabases(s.id)}},{separator:!0},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>B(s)}]})},R=(a,s,m)=>{let M={connectionId:s.id,database:m.name,schema:m.schemas[0]??""},U=(ce,ye="table")=>{g(M),Z(ce,ye,M)};S({x:a.clientX,y:a.clientY,items:[{label:e("overview"),icon:"info",onClick:()=>se(s,m)},{label:e("tables"),icon:"table",onClick:()=>U("relations","table")},{label:e("views"),icon:"view",onClick:()=>U("relations","view")},{label:e("functions"),icon:"function",onClick:()=>U("routines")},{separator:!0},...s.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>ee(s,m.name)}]:[]]})},Y=n.bindings(),X=p?`${p.connectionId}|${p.database}`:"",ae=r.tabs.find(a=>a.id===r.activeId)??null,pe=(0,L.jsxs)("div",{className:"dg-toolbar",children:[(0,L.jsxs)("div",{className:"dg-brand",children:[(0,L.jsx)("span",{className:"dg-brand-badge",children:(0,L.jsx)(k,{name:"database",size:15})}),(0,L.jsx)("span",{className:"dg-brand-title",children:e("panel")})]}),(0,L.jsx)("div",{className:"dg-toolbar-divider"}),(0,L.jsx)("div",{className:"dg-toolgroup dg-obj-pills",children:Vn.map(a=>(0,L.jsxs)(O,{size:"sm",variant:"ghost",onClick:()=>Z(a.target,a.relation),title:e(a.labelKey),children:[(0,L.jsx)(k,{name:a.icon,size:11}),e(a.labelKey)]},a.id))})]}),he=(a,s)=>{a.preventDefault(),a.stopPropagation();let m=r.tabs.findIndex(Ie=>Ie.id===s.id),M=r.tabs.length,U=m>0,ce=m<M-1,ye=M>1,De=[{label:e("closeThisTab"),icon:"x",onClick:()=>n.tabs.close(s.id)},{label:e("closeOtherTabs"),disabled:!ye,onClick:()=>n.tabs.closeOthers(s.id)},{label:e("closeTabsToRight"),disabled:!ce,onClick:()=>n.tabs.closeToRight(s.id)},{label:e("closeTabsToLeft"),disabled:!U,onClick:()=>n.tabs.closeToLeft(s.id)},{separator:!0},{label:e("closeAllTabs"),onClick:()=>n.tabs.closeAll()}];S({x:a.clientX,y:a.clientY,items:De})},re=r.tabs.length?(0,L.jsx)("div",{className:"dg-tabs",role:"tablist",children:r.tabs.map(a=>(0,L.jsxs)("div",{role:"tab",tabIndex:a.id===r.activeId?0:-1,"aria-selected":a.id===r.activeId,className:`dg-tab${a.id===r.activeId?" dg-tab-active":""}`,onClick:()=>n.tabs.activate(a.id),onContextMenu:s=>he(s,a),onKeyDown:s=>{if(s.key==="Enter"||s.key===" "){s.preventDefault(),n.tabs.activate(a.id);return}let m=s.key==="ArrowRight"?1:s.key==="ArrowLeft"?-1:0;if(m===0)return;s.preventDefault();let M=s.currentTarget.parentElement?.children,U=M?.length??0;if(!U)return;let ce=r.tabs[(r.tabs.findIndex(ye=>ye.id===a.id)+m+U)%U];ce&&(n.tabs.activate(ce.id),M?.[r.tabs.indexOf(ce)]?.focus())},title:a.title,children:[(0,L.jsx)(k,{name:a.kind==="table"?a.tableKind==="view"?"view":"table":a.kind==="sql"?"play":a.kind==="queries"?"bookmark":a.kind==="redis"?"database":"info",size:10}),(0,L.jsx)("span",{className:"dg-tab-label",children:a.title}),(0,L.jsx)("button",{type:"button",className:"dg-tab-close","aria-label":`${e("close")} ${a.title}`,onClick:s=>{s.stopPropagation(),n.tabs.close(a.id)},children:(0,L.jsx)(k,{name:"x",size:9})})]},a.id))}):null,Ne=r.tabs.map(a=>{let s=j(a.connectionId),m=(()=>{switch(a.kind){case"overview":{let M=n.connections.session(a.connectionId).databases.find(U=>U.name===a.database);return M?(0,L.jsx)(an,{t:e,store:n,connectionId:a.connectionId,database:M,schemas:M.schemas,onOpenRelations:U=>Z("relations",U),onNewQuery:()=>ee(s,a.database)}):null}case"table":return(0,L.jsx)(cn,{t:e,tab:a,engine:G(a.connectionId),notify:z,onNewQuery:()=>ee(s,a.database)});case"sql":return(0,L.jsx)(ln,{t:e,tab:a,tables:n.catalog.relationsOf(`${a.connectionId}|${a.database}|`).map(M=>M.name),notify:z,onSaved:()=>{n.queries.load()}});case"relations":return(0,L.jsx)(nn,{t:e,store:n,connectionId:a.connectionId,database:a.database,schema:a.schema,kind:a.relation,onOpen:M=>{s&&V(s,a.database,a.schema,M)},onQuery:M=>ee(s,a.database,gn(G(a.connectionId),M.name)),onNewQuery:()=>ee(s,a.database),notify:z});case"routines":return(0,L.jsx)(on,{t:e,store:n,connectionId:a.connectionId,database:a.database,schema:a.schema});case"accounts":return(0,L.jsx)(sn,{t:e,store:n,connectionId:a.connectionId});case"queries":return(0,L.jsx)(rn,{t:e,store:n,onOpen:w,notify:z});case"redis":return(0,L.jsx)(dn,{t:e,tab:a,notify:z});default:return null}})();return(0,L.jsx)("div",{className:"dg-pane",style:{display:a.id===r.activeId?"contents":"none"},"aria-hidden":a.id!==r.activeId,children:m},a.id)}),b=(0,L.jsxs)("div",{className:"dg-status",children:[i.activeId?(0,L.jsxs)("span",{className:"dg-status-item",children:[(0,L.jsx)(k,{name:"database",size:10}),(0,L.jsx)("b",{children:j(i.activeId)?.name??""}),(0,L.jsx)("span",{children:n.connections.session(i.activeId).version||j(i.activeId)?.engine||""})]}):(0,L.jsx)("span",{className:"dg-status-item",children:e("selectConnection")}),p?(0,L.jsxs)("span",{className:"dg-status-item",children:[(0,L.jsx)("span",{children:p.database}),p.schema?(0,L.jsxs)("span",{children:["\xB7 ",p.schema]}):null]}):null,(0,L.jsx)("div",{className:"dg-spacer"}),Y.length>0?(0,L.jsxs)("span",{className:"dg-status-item",children:[e("boundProject"),": ",Y.length]}):null,(0,L.jsx)("span",{className:"dg-status-item",children:ae?ae.kind:"ready"})]});return(0,L.jsxs)("div",{className:"dg-root",children:[(0,L.jsx)("style",{children:Zt}),pe,d.error?(0,L.jsx)(fe,{tone:"error",onClose:()=>{n.meta.load()},children:d.error}):null,(0,L.jsxs)("div",{className:"dg-body",children:[(0,L.jsx)("div",{style:{width:H,flex:`0 0 ${H}px`,display:"flex",minWidth:0},children:(0,L.jsx)(un,{store:n,t:e,selectedDatabaseKey:X,onNewConnection:()=>v({kind:"connection"}),onOpenWorkspaces:()=>v({kind:"workspaces"}),onSelectDatabase:W,onOpenTable:(a,s,m,M)=>V(a,s.name,m,M),onConnectionMenu:F,onDatabaseMenu:R,onNewQuery:(a,s)=>ee(a,s.name)})}),(0,L.jsx)(_t,{width:H,setWidth:q,min:200,max:420}),(0,L.jsxs)("div",{className:"dg-main",children:[re,r.tabs.length===0?(0,L.jsx)(ve,{title:e("selectConnection"),hint:e("agentHint"),children:(0,L.jsxs)("div",{className:"dg-welcome-actions",children:[(0,L.jsxs)(O,{className:"dg-btn-new-conn",onClick:()=>v({kind:"connection"}),children:[(0,L.jsx)(k,{name:"plus",size:11}),e("newConnection")]}),(0,L.jsxs)(O,{variant:"ghost",onClick:()=>v({kind:"workspaces"}),children:[(0,L.jsx)(k,{name:"link",size:11}),e("workspaces")]})]})}):null,Ne,I?(0,L.jsxs)("div",{className:`dg-toast${I.tone==="error"?" dg-toast-error":""}`,children:[(0,L.jsx)(k,{name:I.tone==="error"?"alert":"check",size:11}),(0,L.jsx)("span",{className:"dg-truncate",children:I.message})]}):null]})]}),b,f&&f.kind==="connection"?(0,L.jsx)(en,{t:e,engines:d.meta?.engines??[],initial:f.initial??null,onClose:()=>v(null),onSave:P}):null,f&&f.kind==="workspaces"?(0,L.jsx)(tn,{t:e,store:n,onClose:()=>v(null),notify:z}):null,x?(0,L.jsx)(je,{x:window.innerWidth/2,y:window.innerHeight/2,onClose:()=>B(null),items:[{label:e("confirmDeleteConnection"),disabled:!0},{separator:!0},{label:e("cancel"),onClick:()=>B(null)},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>{let a=x;B(null),n.connections.remove(a.id).catch(s=>z(s instanceof Error?s.message:String(s),"error"))}}]}):null,T?(0,L.jsx)(je,{x:T.x,y:T.y,items:T.items,onClose:()=>S(null)}):null]})}var $e=require("react/jsx-runtime"),at="grid",mn="grid";function Wn({size:t=20,active:e}){return(0,$e.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,focusable:"false",children:[(0,$e.jsx)("ellipse",{cx:"12",cy:"5.6",rx:"7.1",ry:"2.9",stroke:"currentColor",strokeWidth:1.5}),(0,$e.jsx)("path",{d:"M4.9 5.6v12.8c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9V5.6",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round"}),(0,$e.jsx)("path",{d:"M4.9 9.9c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,$e.jsx)("path",{d:"M4.9 14.2c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,$e.jsx)("rect",{x:"10.55",y:"9.55",width:"2.9",height:"10.9",rx:"1.2",fill:"var(--dsw-alias-brand-primary)",opacity:e===!1?.55:.9})]})}function Jn(t){t.effect(()=>t.locale.register(at,qt),"grid: dictionaries");let e=t.locale.bind(at);t.slots.inject("main",()=>t.slots.register({name:"main",key:mn,locale:at},pn)),t.slots.inject("sidebar.panellist",()=>t.slots.register({name:"sidebar.panellist",id:mn,order:15,label:()=>e("panel"),locale:at},Wn))}var Un={inject:["slots","locale"],apply:Jn};

    return module.exports.default || module.exports;
  },
});
